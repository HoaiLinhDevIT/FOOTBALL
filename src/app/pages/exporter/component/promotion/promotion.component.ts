/* eslint-disable  @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '@common/components/toaster/toaster.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { MENU_DATA_EXPORTER, MENU_SETTING_EXPORTER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { ExporterService } from '../../http-service/exporter.service';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;
  public allPromotion : any;
  public constructor(
    private dialogRef: MatDialog,
    private sellerSv: ExporterService,
    private dialogcf: DialogConfirmService,
    private toaster: ToasterService
  ) { }

  public ngOnInit(): void {
  this.getAllCategory();

  }


  public dialogPromotion() {
    const dialog = this.dialogRef.open(DetailPromotionComponent, {
      width: '412px',
      height: '520px'
    });
    dialog.afterClosed().subscribe(x => {
      this.getAllCategory();
    });
  }

  public dialogUpdate(data: any) {
    const dialog = this.dialogRef.open(DetailPromotionComponent, {
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
    this.sellerSv.getListPromotion().subscribe({
      next: (res) => {

        this.allPromotion = res.data;
      },
      error: () => {
        console.log("error");
      }
    });
  }

  public deleteCategory(id: number): void {
    this.dialogcf.confirmDialog('Xác nhận xoá').afterClosed().subscribe((x: boolean) => {
      if (x) {
        this.sellerSv.deletePromotion(id).subscribe((res: any | HttpErrorResponse) => {
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
