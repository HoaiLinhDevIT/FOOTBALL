/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GROUP_COUNTRY, SLIDE_TOGGLE } from '@core/config';
import { Country, SlideToggle } from '@layout/models/menu.model';
import { Observable } from 'rxjs';
import { AdminService } from '../admin/http-service/admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild('dialogInput') public dialogDropdownInput!: ElementRef;
  @ViewChild('dialogOutput') public dialogDropdownOutput!: ElementRef;

  public hompageLogo: string = 'icon-logo-football';
  public isreplace: boolean = false;
  public inputIcon: string = '../../../assets/icon-svg/icon-jpy-dropdown.svg';
  public inputName: string = 'JPY';
  public inputMoney: string = '200,000';
  public outputIcon: string = '../../../assets/icon-svg/icon-usd.svg';
  public outputName: string = 'USD';
  public outputMoney: string = '500,000';

  public isShowDialogInput: boolean = false;
  public isShowDialogOutput: boolean = false;


  public panelOpenState = false;
  public listMenu: Array<string> = ['Người mua', 'Người bán', 'Hỗ trợ'];
  public listContentSubMenu: Array<string> = [];
  public activeMenu = 99;

  public groupCountry: Country[] = GROUP_COUNTRY;
  public slideToggle: SlideToggle[] = SLIDE_TOGGLE;
  public groupTrans: FormGroup = new FormGroup({});

  public b = 1;
  public checklogin: any;

  public constructor(
    private router: Router,
    private fb: FormBuilder,
    private adminSv: AdminService
  ) { }

  public ngOnInit(): void {
    // set initial selection
    this.initData();
    this.setTime();
    this.checkLogin();
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async autoCheck(isCheck = true) {
    for (let index = 0; index < this.slideToggle.length; index++) {
      await this.sleep(3000);
      this.slideToggle[index].checked = isCheck;
      this.slideToggle[index].active = 'is-outstanding';
      if (index > 0) {
        this.slideToggle[index - 1].active = '';
      }
    }
    if (this.slideToggle[this.slideToggle.length - 1].checked) {
      await this.sleep(2000);
      this.slideToggle.forEach(async (item) => {
        if (item.id === 0) {
          item.checked = true;
          item.active = 'is-outstanding';
        } else {
          item.checked = false;
          item.active = '';
        }
      });
      this.autoCheck();
    }
  }

  public initData(): void {
    this.autoCheck();
    this.groupTrans = this.fb.group({
      transFrom: new FormControl(null),
      transTo: new FormControl(null)
    });
  }

  public login(): void {
    this.router.navigate(['auth/login']);
  }

  public register(): void {
    this.router.navigate(['auth/register']);
  }

  public activeMenuIdx(idx: number): void {
    if (this.activeMenu === idx) {
      this.activeMenu = 99;
    } else {
      this.activeMenu = idx;
    }
  }

  public onClickMenuInput(item: Country): void {
    this.inputIcon = item.iconUrl;
    this.inputName = item.money;
    this.isShowDialogInput = false;

  }
  public onClickMenuOutput(item: Country): void {
    this.outputIcon = item.iconUrl;
    this.outputName = item.money;
    this.isShowDialogOutput = false;
  }
  public openDialogInput(): void {
    this.isShowDialogInput = !this.isShowDialogInput;
  }
  public openDialogOutput(): void {
    this.isShowDialogOutput = !this.isShowDialogOutput;
  }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    if (this.dialogDropdownInput) {
      const clickOutside = targetElement.contains(this.dialogDropdownInput.nativeElement);
      if (clickOutside) {
        this.isShowDialogInput = false;
      }
    }
    if (this.dialogDropdownOutput) {
      const clickOutside = targetElement.contains(this.dialogDropdownOutput.nativeElement);
      if (clickOutside) {
        this.isShowDialogOutput = false;
      }
    }
  }

  public setTime(): void {
    setInterval(() => {
      this.b += 1;
      if (this.b === 3) {
        this.b = 1;
      }
    }, 3000);

  }



  public checkLogin(): void {
    this.adminSv.checklogin().subscribe((res) => {
      this.checklogin = res.data;
      console.log(this.checklogin);

    });
  }


}
// const observable = new Observable(function subcribe(ob){
//   const id = setInterval(() =>{
//     SLIDE_TOGGLE[2].checked = true;
//   }, 3000);

//   return function unsubcribe(){
//     ob.complete();
//     clearInterval(id);
//   }
// });
// const subcription = observable.subscribe({
//   next: val => console.log(val),
//   error: err => console.log(err),
//   complete: () => console.log('complete')
// })
// setTimeout(() => {
//   subcription.unsubscribe()
// }, 10000)
