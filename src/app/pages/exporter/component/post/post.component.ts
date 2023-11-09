/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { MENU_DATA_EXPORTER, MENU_SETTING_EXPORTER } from '@core/config';
import { environment } from '@env/environment';
import { ISideMenuNode } from '@layout/models/menu.model';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';
import { RequestParamOrderSeach } from 'src/app/pages/customer/models/customerOrder.model';
import { PostDetailComponent } from './post-detail/post-detail.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;
  public AllCategory: any;
  public selectedTabIndex: number = 0;
  public requestParam: RequestParamOrderSeach = {
    page: environment.pageIndex,
    size: environment.pageSize,
    keyWord: ''
  };
  public constructor(
    private dialogRef: MatDialog,
    private adminSv: AdminService,
    private dialogcf: DialogConfirmService,
    private toaster: ToasterService
  ) { }

  public ngOnInit(): void {
    this.getAllCategory();
  }

  public dialogCategory() {
    const dialog = this.dialogRef.open(PostDetailComponent, {
      width: '412px',
      height: '520px'
    });
    dialog.afterClosed().subscribe(x => {
      this.getAllCategory();
    });
  }

  public dialogUpdate(data: any) {
    const dialog = this.dialogRef.open(PostDetailComponent, {
      data: data,
      width: '412px',
      height: '520px'

    });
    dialog.disableClose = false;
    dialog.afterClosed().subscribe(x => {
      this.getAllCategory();
    });
  }

  public getAllCategory(): void {
    this.adminSv.getPost(this.requestParam).subscribe({
      next: (res) => {

        this.AllCategory = res.data;

      },
      error: () => {
        console.log("error");
      }
    });
  }

  private getListCustomerOrder(): void {
    switch (this.selectedTabIndex) {

      case 0:
        this.requestParam.fieldsTab = "";
        this.getAllCategory();
        break;
      case 1:
        this.requestParam.fieldsTab = "all";
        this.getAllCategory();
        break;
      case 2:
        this.requestParam.fieldsTab = "open";
        this.getAllCategory();
        break;
    }
  }

  public deleteCategory(id: number): void {
    this.dialogcf.confirmDialog('Xác nhận xoá').afterClosed().subscribe((x: boolean) => {
      if (x) {
        this.adminSv.deleteNews(id).subscribe((res: any | HttpErrorResponse) => {
          if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
            this.toaster.show('error', 'Thất Bại', 'Xoá thất bại');
          } else {
            this.toaster.show('success', 'Thành Công', 'Xoá thành công');
            this.getAllCategory();
          }
        });

      }
    });
  }
}
