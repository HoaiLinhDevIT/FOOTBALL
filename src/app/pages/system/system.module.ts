import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { CommonAppModule } from '@common/common.module';
import { LayoutModule } from '@layout/layout.module';
import { OperatorComponent } from './component/operator/operator.component';
import { AddEditOperatorComponent } from './component/operator/add-edit-operator/add-edit-operator.component';
import { MatDialogModule } from '@angular/material/dialog';

const Components = [
  OperatorComponent,
  AddEditOperatorComponent
];

@NgModule({
  declarations: [
    SystemComponent,
    ...Components
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    CommonAppModule.forRoot(),
    LayoutModule,
    MatDialogModule
  ]
})
export class SystemModule { }
