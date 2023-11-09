import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesModel } from '@common/models';
import { AuthGuard, RoleGuard } from '@core/guards';
import { OperatorComponent } from './component/operator/operator.component';
import { SystemComponent } from './system.component';

const routes: Routes = [
  {
    path: '', component: SystemComponent, children: [
      { path: '', redirectTo: 'operator', pathMatch: 'full' },
      {
        path: 'operator', component: OperatorComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [RolesModel.SYSTEM]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
