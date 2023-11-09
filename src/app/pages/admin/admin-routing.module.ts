import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesModel } from '@common/models';
import { AuthGuard, RoleGuard } from '@core/guards';
import { AdminComponent } from './admin.component';
import { BuyerComponent } from './component/buyer/buyer.component';
import { SellerComponent } from './component/seller/seller.component';
import { OrderComponent } from './component/order/order.component';
import { AddEditOrderComponent } from'./component/order/add-edit-order/add-edit-order.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddEditBuyerComponent } from './component/buyer/add-edit-buyer/add-edit-buyer.component';
import { AddEditSellerComponent } from './component/seller/add-edit-seller/add-edit-seller.component';
import { PaymentManagementComponent } from './component/payment-management/payment-management.component';
import { RemittanceManagementComponent } from './component/remittance-management/remittance-management.component';
import { AddEditRemittanceComponent} from './component/remittance-management/add-edit-remittance/add-edit-remittance.component';
import { AddEditPaymentComponent } from './component/payment-management/add-edit-payment/add-edit-payment.component';
import { NewsComponent } from './component/news/news.component';
import { CommentComponent } from './component/comment/comment.component';
const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'buyer', pathMatch: 'full' },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'comment', component: CommentComponent
      },
      {
        path: 'news', component: NewsComponent
      },
      {
        path: 'buyer', component: BuyerComponent
      },
      {
        path: 'add-edit-buyer', component: AddEditBuyerComponent
      },
      {
        path: 'seller', component: SellerComponent
      },
      {
        path: 'seller', component: AddEditSellerComponent
      },
      {
        path: 'order', component: OrderComponent
      },
      {
        path: 'add-edit-order', component: AddEditOrderComponent
      },
      {
        path: 'payment', component: PaymentManagementComponent
      },
      {
        path: 'remittance', component: RemittanceManagementComponent
      },
      {
        path: 'add-edit-remittance', component: AddEditRemittanceComponent
      },
      {
        path: 'add-edit-payment', component: AddEditPaymentComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
