import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-chatbox',
  templateUrl: './test-chatbox.component.html',
  styleUrls: ['./test-chatbox.component.scss']
})
export class TestChatboxComponent implements OnInit {

  public requestNo: string = 'D12345';
  public constructor() { }

  public ngOnInit(): void {
    let x = '';
  }

}
