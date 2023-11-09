/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { Utils } from '@common/utils/utils';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  public utils = Utils;
  public group: FormGroup = new FormGroup({});
  public constructor(
    private ca: FormBuilder,
    public dialogOp: MatDialogRef<PostDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private dataRow: any,
    private adminSv: AdminService,
    private toaster: ToasterService
  ) { }

  public ngOnInit(): void {
    console.log(this.dataRow);
    this.initForm();
    this.group.get("image")?.setValue(this.dataRow.image);
    this.group.get("title")?.setValue(this.dataRow.title);
    this.group.get("content")?.setValue(this.dataRow.content);

  }

  public initForm(initData?: any): void {
    this.group = this.ca.group({
      id: new FormControl(this.dataRow ? this.dataRow.id : null),
      image: new FormControl(this.dataRow ? this.dataRow.image : null, []),
      title: new FormControl(this.dataRow ? this.dataRow.title : null),
      content: new FormControl(this.dataRow ? this.dataRow.content : null, []),
      active: new FormControl("1",[])
    });
  }

  public addCategory(): void {


    this.adminSv.addNews(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Thêm danh mục thất bại');
        const response = res as HttpErrorResponse;
      } else {
        const response = res as any;
        this.initForm(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Thêm mới thành công');
        this.closeDialog();


      }

    });
  }

  public updateCategory(): void {
    this.adminSv.updateNews(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Chỉnh sửa thất bại');
        const response = res as HttpErrorResponse;
      } else {

        const response = res as any;
        this.initForm(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Chỉnh sửa thành công');
        this.closeDialog();
      }

    });
  }

  public saveUser(): void {
    if (this.dataRow) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  public closeDialog(): void {
    this.dialogOp.close();
  }

}
