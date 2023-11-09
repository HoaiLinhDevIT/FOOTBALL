/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../admin/http-service/admin.service';
import { PitchDetailComponent } from './pitch-detail/pitch-detail.component';

@Component({
  selector: 'app-pitch',
  templateUrl: './pitch.component.html',
  styleUrls: ['./pitch.component.scss']
})
export class PitchComponent implements OnInit {
  public listPitch: any;
  public hompageLogo: string = 'icon-logo-football';
  public checklogin: any;

  public constructor(
    private adm: AdminService,
    private dialogRef: MatDialog,
    private adminSv: AdminService
  ) { }

  public ngOnInit(): void {
    this.checkLogin();
    this.getCategory();
  }

  public getCategory(): void{
    this.adm.getAllPitch().subscribe((res)=>{
      this.listPitch = res.data;
      console.log(this.listPitch);

    });
  }

  public formatPrice(number: number | bigint): string {
    let num = number?.toString();
    if (number) {
      let newNum = "";
      for (let i=num.length-1, j=1; i>=0; i--, j++) {
        newNum = num[i] + newNum;
        if (j%3===0 && i!==0) { newNum = "," + newNum; }
      }
      return newNum;
    }
    return num;
  }

  public dialogCreate(data: any) {
    const dialog = this.dialogRef.open(PitchDetailComponent, {
      width: '1000px',
      height: '800px',
      data: data
    });
    dialog.disableClose = false;
    dialog.afterClosed().subscribe(x => {
    });
  }

  public checkLogin(): void {
    this.adminSv.checklogin().subscribe((res) => {
      this.checklogin = res.data;
      console.log(this.checklogin);

    });
  }

}
