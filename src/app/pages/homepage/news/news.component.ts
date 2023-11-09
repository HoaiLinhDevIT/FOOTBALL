import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public hompageLogo: string = 'icon-logo-football';
  public constructor() { }

  public ngOnInit(): void {
    console.log('news tin tức');

  }

}
