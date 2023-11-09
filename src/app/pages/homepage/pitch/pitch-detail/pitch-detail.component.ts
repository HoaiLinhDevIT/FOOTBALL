/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { AdminService } from 'src/app/pages/admin/http-service/admin.service';

@Component({
  selector: 'app-pitch-detail',
  templateUrl: './pitch-detail.component.html',
  styleUrls: ['./pitch-detail.component.scss']
})
export class PitchDetailComponent implements OnInit {
  public hompageLogo: string = 'icon-logo-football';
  public group: FormGroup = new FormGroup({});
  public ListTime: any;
  public constructor(
    private adm: AdminService,
    private adminSv: AdminService,
    @Inject(MAT_DIALOG_DATA) public dataRow: any,
    private toaster: ToasterService,
    public dialogOp: MatDialogRef<PitchDetailComponent>,
    private address: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.getCategory();
    console.log(this.dataRow);
    this.initdata();
  }

  public initdata(initData?: any): void {
    this.group = this.address.group({
     pitchName: new FormControl(this.dataRow ? this.dataRow.pitchName : null,[]),
     sellerId: new FormControl(this.dataRow ? this.dataRow.sellerId : null,[]),
     price: new FormControl(this.dataRow ? this.dataRow.price : null,[]),
     time: new FormControl(null,[])
    });
  }


  public getCategory(): void{
    this.adm.getListTime().subscribe((res)=>{
      this.ListTime = res.data;
    });
  }

  public closeDialog():void{
    this.dialogOp.close();
  }

  public addOrder(): void{
    this.adminSv.addHistory(this.group.value).subscribe((res: any | HttpErrorResponse) => {
      if ((res as HttpErrorResponse).status && (res as HttpErrorResponse).status !== 200) {
        this.toaster.show('error', 'Thất Bại', 'Vui lòng đăng nhập');
        const response = res as HttpErrorResponse;
      } else {
        const response = res as any;
        this.initdata(response.data as any);
        this.toaster.show('success', 'Thành Công', 'Thêm mới thành công');
        this.closeDialog();


      }

    });
  }

}
