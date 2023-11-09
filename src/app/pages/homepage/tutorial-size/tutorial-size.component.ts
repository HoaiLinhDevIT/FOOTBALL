import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-size',
  templateUrl: './tutorial-size.component.html',
  styleUrls: ['./tutorial-size.component.scss']
})
export class TutorialSizeComponent implements OnInit {

  public hompageLogo: string = 'icon-logo-football';
  public constructor() { }

  public ngOnInit(): void {
    console.log("first");
  }

}
