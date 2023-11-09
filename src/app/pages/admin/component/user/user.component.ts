/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSearchModel, ButtonActionModel, ButtonConfig } from '@common/models';
import { DataSearchModel } from '@core/models';
import { environment } from '@env/environment';
import { CloseEventEditModel, HttpClienGetUserByIdResponse, HttpClienGetUserResponse, RequestParamUserSeach, SortDataTableEventModel, UserModel, UserResponse } from '../../model';
import { TABLE_USER_CONFIG, USER_SEARCH_CONFIG } from './user.config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public btnSearchConfig = new ButtonConfig(true, true);
  public tableSearchConfig = USER_SEARCH_CONFIG;
  public isToggleEdit: boolean = false;
  public tableUserConfig = TABLE_USER_CONFIG;
  public dataSource = new DataSearchModel();
  public rowPicked: UserModel | undefined;
  public page: number = environment.pageIndex;
  public size: number = environment.pageSize;
  public keySeach: string = '';
  public requestParam: RequestParamUserSeach = {
    page: environment.pageIndex,
    size: environment.pageSize,
    keyWord: ''
  };
  public constructor(
  ) { }

  public ngOnInit(): void {
    let a=  0;
  }

}
