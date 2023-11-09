import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionSearchModel, ButtonActionModel, ButtonConfig } from '@common/models';
// import { MENU_SETTING_OPERATOR } from '@core/config';
import { DataSearchModel } from '@core/models';
import { LanguageService } from '@core/services';
import { environment } from '@env/environment';
import { ISideMenuNode } from '@layout/models/menu.model';
import { ToastrService } from 'ngx-toastr';
import { OperatorService } from '../../http-services/operator.service';
// eslint-disable-next-line max-len
import { HttpClienGetOperatorByIdResponse, HttpClienGetOperatorResponse, HttpClienOperatorCreateResponse, OperatorModel, OperatorResponse, RequestParamOperatorSeach } from '../../models/operator.model';
import { AddEditOperatorComponent } from './add-edit-operator/add-edit-operator.component';
import { OPERATOR_SEARCH_CONFIG, TABLE_OPERATOR_CONFIG } from './operator.config';
import { DatatableComponent } from '@common/components/datatable/datatable.component';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ToasterService } from '@common/components/toaster/toaster.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public selectionModel!: SelectionModel<any>;
  public operatorGroup: FormGroup = new FormGroup({});
  public title: string = '';
  public btnSearchConfig = new ButtonConfig(true, true);
  public tableSearchConfig = OPERATOR_SEARCH_CONFIG;
  public isToggleEdit: boolean = false;
  public tableUserConfig = TABLE_OPERATOR_CONFIG;
  public dataSource = new DataSearchModel();

  public rowPicked: OperatorModel | undefined;
  public page: number = environment.pageIndex;
  public size: number = environment.pageSize;
  public keySeach: string = '';
  public requestParam: RequestParamOperatorSeach = {
    page: environment.pageIndex,
    size: environment.pageSize,
    keyWord: ''
  };
  public biding: string = '';
  public iconClear: boolean = false;

  @ViewChild(DatatableComponent) public childDataTable!: DatatableComponent;


  public child!: AddEditOperatorComponent;
  public constructor(
    private toaster: ToasterService,
    private operatorService: OperatorService,
    private toastr: ToastrService,
    private languageService: LanguageService,
    private dialogRef: MatDialog,
    private dialog: DialogConfirmService,
    private ope: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.initData();
  }
public input(data?: RequestParamOperatorSeach): void{
  this.operatorGroup = this.ope.group({
    text: new FormControl(null, [])
  });
}

  public initData(): void {
    this.title = 'Operator Management';



    this.operatorService.getOperator(this.requestParam).subscribe((res: HttpClienGetOperatorResponse) => {
      if (res.data) {

        let prevUserPage = [...this.dataSource.results];
        let prevNoRecordInPage = this.dataSource.noRecordInPage;

        this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
        this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

        // this.dataSource.results = [...prevUserPage, ...res.data.results];
      }
    });

  }
  public getRowPicked(): OperatorModel | null {
    if (this.rowPicked) {
      return this.rowPicked;
    }
    return null;
  }

  public openDialog() {
    this.dialogCreate();
  }

  public handleBtnDataTableClick(event: ButtonActionModel): void {
    switch (event.action) {
      case 'deleted':
        this.dialog.confirmDialog('Bạn có muốn xoá tài khoản').afterClosed().subscribe((x: boolean) => {
          if (x) {
            this.operatorService.deleteUserById((event.rowItem as OperatorResponse).userId).subscribe((res: HttpClienGetOperatorByIdResponse | HttpErrorResponse) => {
              if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
                this.toaster.show('error','Thất bại', 'Gặp lỗi khi xoá');
              } else {
                this.toaster.show('success','Thành công', 'Đã xoá tài khoản');
                this.initData();
              }
            });
            this.childDataTable.selectedRow = null;
          }
        });
        break;

      //update
      case 'edit':
        this.rowPicked = event.rowItem as OperatorModel;
        this.childDataTable.selectedRow = { ...event.rowItem };
        this.dialogUpdate(this.rowPicked);

        break;
      case 'resetPass':

        this.dialog.confirmDialog('Bạn có muốn đặt lại mật khẩu').afterClosed().subscribe((x: boolean) => {
          if (x) {

            this.operatorService.resetPassOperator((event.rowItem as OperatorResponse)).subscribe((res: HttpClienOperatorCreateResponse  | HttpErrorResponse) => {
              if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
                this.toaster.show('error','Thất bại', 'Xảy ra lỗi khi đặt lại mật khẩu');
              } else {
                this.toaster.show('success','Thành công', 'Đặt lại mật khẩu thành công');
                this.initData();
              }
            });
            this.childDataTable.selectedRow = null;
          }
        });
      break;

      case 'previous':
        this.requestParam.page--;
        this.operatorService.getOperator(this.requestParam).subscribe((res: HttpClienGetOperatorResponse) => {
          if (res.data) {
            this.isToggleEdit = false;
            let prevUserPage = [...this.dataSource.results];
            let prevNoRecordInPage = this.dataSource.noRecordInPage;

            this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
            this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

            this.dataSource.results = [...res.data.results];
          }
        });
        break;

      case 'next':
        this.requestParam.page++;
        this.operatorService.getOperator(this.requestParam).subscribe((res: HttpClienGetOperatorResponse) => {
          if (res.data) {
            this.isToggleEdit = false;
            let prevUserPage = [...this.dataSource.results];
            let prevNoRecordInPage = this.dataSource.noRecordInPage;

            this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
            this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

            this.dataSource.results = [...res.data.results];
          }
        });
        break;
    }
  }

  public dialogCreate() {
    const dialog = this.dialogRef.open(AddEditOperatorComponent, {
      width: '412px',
      height: '600px'
    });
    dialog.disableClose = true;
    dialog.afterClosed().subscribe(x => {
      this.initData();
    });
  }

  public dialogUpdate(data: OperatorModel | undefined) {
    const dialog = this.dialogRef.open(AddEditOperatorComponent, {
      width: '412px',
      height: '600px',
      data: data
    });
    dialog.disableClose = true;
    dialog.afterClosed().subscribe(x => {
      this.initData();
    });
  }

 //------------ SEARCH DATA -------------------------//
 public handleSearchClk(): void {

  this.requestParam.keyWord = this.biding;
  this.requestParam.page = environment.pageIndex;
  this.operatorService.getOperator(this.requestParam).subscribe((res: HttpClienGetOperatorResponse) => {
    if (res.data) {

      let prevUserPage = [...this.dataSource.results];
      let prevNoRecordInPage = this.dataSource.noRecordInPage;

      this.dataSource = { ...this.dataSource, ...res.data as DataSearchModel };
      this.dataSource.noRecordInPage = prevNoRecordInPage + res.data.noRecordInPage;

      // this.dataSource.results = [...prevUserPage, ...res.data.results];
    }
  });
  // this.biding = '';
}
public clearSearch():void{
  this.biding = '';
  this.iconClear = false;
}
public isShowIcon(): void{
  if(this.biding !== ''){
    this.iconClear = true;
  }else{
    this.iconClear = false;
  }
}
}

