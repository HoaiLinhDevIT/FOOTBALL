/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ChatModel } from '@common/models/user/user.models';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import { environment } from '@env/environment';
import { ChatResponse, HttpClienChatResponse, RequestParamChatModel } from '@layout/models/chat.model';
import { UserDetailModel } from '@layout/models/user.model';
import { LoadingSpinnerDialogService } from '@layout/services';
import { CommonService } from '@layout/services/common.service';
import { map, Observable, of } from 'rxjs';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.scss']
})
export class ChatGroupComponent implements OnInit {
  @Input() public requestNo: string = '';
  public utils = Utils;
  public message: string ='';
  public chatModelList: ChatModel[] = [];
  public userList: string[] = [];
  private socket: any;
  private userLogin!: UserDetailModel;
  public userId: number = 0;
  public dataSource!: Array<ChatResponse>;

  public constructor(
    private commonService: CommonService,
    private dialogService: DialogConfirmService,
    private loadingDialog: LoadingSpinnerDialogService
  ) { 
  }

  public ngOnInit(): void {
    let infoUserLogin = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    if (Object.keys(infoUserLogin).length !== 0) {
      this.userLogin = infoUserLogin as UserDetailModel;
      this.userId = this.userLogin.userId;
    }
    console.log(this.requestNo);
    this.InitData();
  }

  public sendMessage(): void {
    const data = {
      requestNo: this.requestNo,
      userId: this.userId,
      message: this.message,
      dateTime: this.utils.getCurrentDateChatFormat(),
      mine: '1',
      createDate: this.utils.convertDateFormat(new Date(), 'YYYYMMDDHHMMSS', '-')
    };
    this.socket.emit('sendMessage',data);
    this.chatModelList.push({user: this.userId, message: this.message, dateTime: this.utils.getCurrentDateChatFormat(), mine: true});
    this.message = '';
  }

  private InitData(): void{
    this.loadingDialog.showSpinner(true);
    const requestParam: RequestParamChatModel = {
      requestNo: this.requestNo,
      page: 1,
      size: 30
    } ;
    of(this.commonService.getListChat(requestParam).subscribe({
      next: (res: HttpClienChatResponse) => {
        if(res.data){
          this.dataSource = this.sort(res.data.results);
          this.dataSource.map((item) => {
            this.chatModelList.push({
              user: item.userId,
              message: item.message, 
              dateTime: item.dateTime,
              mine: item.userId === this.userId ? true : false
            });
          });
        }
      },
      error: () => {
        this.dialogService.customMessage('error', 'Cannot get list chat. Please contact System Administrator.');
        this.loadingDialog.showSpinner(false);
      }
    }));
    this.socket = io.io(`http://localhost:3000`);
    this.socket.emit("createUser", this.userId.toString());
    this.socket.emit('createRoom', this.requestNo);
    this.socket.emit('updateRooms', this.requestNo);
    this.socket.on('updateChat', (data: {message: string, userName: string}) => {
      if (data) {
        this.chatModelList.push({user: this.userId, message: data.message, dateTime: this.utils.getCurrentDateChatFormat(), mine: false});
      }
    });
    this.loadingDialog.showSpinner(false);
  }
  private sort(data: Array<ChatResponse>){
    return data.sort((a,b) => {
      return <any>new Date(a.createDate) - <any>new Date(b.createDate);
    });
  }

}
