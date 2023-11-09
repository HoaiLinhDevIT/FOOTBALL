import { Component, OnInit } from '@angular/core';
import { Toast } from '@common/models/toaster/toast.model';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster-container',
  template: `
    <app-toaster
      *ngFor="let toast of toasts; let i = index"
      [toast]="toast"
      [index]="i"
      (removeItem)="remove($event)"
    ></app-toaster>
  `,
  styles: []
})
export class ToasterContainerComponent implements OnInit {
  public toasts: Toast[] = [];

  public constructor(public toaster: ToasterService) {}

  public ngOnInit() {
    this.toaster.toast$.subscribe((toast) => {
      this.toasts = [toast, ...this.toasts];
      setTimeout(() => this.toasts.pop(), toast.delay || 3000);
    });
  }

  public remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
    this.toasts.splice(index, 1);
  }

}