import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toast } from '@common/models/toaster/toast.model';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {

  @Input() public toast!: Toast;
  @Input() public index!: number;

  @Output() public removeItem = new EventEmitter<number>();

}
