import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ISideMenuNode } from '@layout/models/menu.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, AfterViewChecked {
  @Input() public dataMenu?: Array<ISideMenuNode>;

  public click = false;
  public constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }


  public ngOnInit(): void {
    let a = "";
  //nothing
  }

  public ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public onClickMenuClick(item: ISideMenuNode): void {
    if(item.name.includes(this.router.url)){
      return;
    }
    this.router.navigate([item.route]);
  }
}
