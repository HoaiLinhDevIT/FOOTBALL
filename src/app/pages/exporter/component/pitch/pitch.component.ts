/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MENU_DATA_EXPORTER, MENU_SETTING_EXPORTER } from '@core/config';
import { ISideMenuNode } from '@layout/models/menu.model';
import { ExporterService } from '../../http-service/exporter.service';
import { PitchDetailComponent } from './pitch-detail/pitch-detail.component';

@Component({
  selector: 'app-pitch',
  templateUrl: './pitch.component.html',
  styleUrls: ['./pitch.component.scss']
})
export class PitchComponent implements OnInit {
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_EXPORTER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_EXPORTER;
  public listPitch: any;
  public constructor(
    private dialogRef: MatDialog,
    private expService: ExporterService
  ) { }

  public ngOnInit(): void {
    this.getListCart();

  }
  public dialogCategory() {
    const dialog = this.dialogRef.open(PitchDetailComponent, {
      width: '412px',
      height: '600px'
    });
    dialog.afterClosed().subscribe(x => {
      this.getListCart();
    });
  }

  public getListCart(): void {

    this.expService.getPitch().subscribe({
      next: (res) => {
        this.listPitch = res.data;
        console.log(this.listPitch);

      },
      error: () => {
        console.log("error");
      }
    });
  }
}
