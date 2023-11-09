import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ExporterComponent } from './exporter.component';
import { NotificationComponent } from './component/notification/notification.component';
import { OrderComponent } from './component/order/order.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProductComponent } from './component/product/product.component';
import { PostComponent } from './component/post/post.component';
import { PitchComponent } from './component/pitch/pitch.component';
import { HistoryComponent } from './component/history/history.component';
import { PromotionComponent } from './component/promotion/promotion.component';
import { HistoryPitchComponent } from './component/history-pitch/history-pitch.component';

const routes: Routes = [
  {
    path: '', component: ExporterComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'promotion', component: PromotionComponent
      },
      {
        path: 'history', component: HistoryPitchComponent
      },
      {
        path: 'order', component: OrderComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'notification', component: NotificationComponent
      },
      {
        path: 'product', component: ProductComponent
      },
      {
        path: 'post', component: PostComponent
      },
      {
        path: 'pitch', component: PitchComponent
      },
      {
        path: 'history', component: HistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExporterRoutingModule { }
