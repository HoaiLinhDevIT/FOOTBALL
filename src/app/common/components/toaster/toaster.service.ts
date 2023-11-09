import { Injectable } from '@angular/core';
import { Toast } from '@common/models/toaster/toast.model';
import { ToastType } from '@common/models/toaster/toast.type';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToasterContainerComponent } from './toaster-container.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public subject: BehaviorSubject<Toast>;
  public toast$: Observable<Toast>;
  public toast!: Toast;

  public constructor() {
    this.subject = new BehaviorSubject<Toast>(this.toast);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== undefined));
  }

  public show(type: ToastType, title?: string, body?: string, delay?: number) {
    this.subject.next({ type, title, body, delay });
  }


}