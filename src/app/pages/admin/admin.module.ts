import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CommonAppModule } from '@common/common.module';
import { UserComponent } from './component/user/user.component';
import { LayoutModule } from '@layout/layout.module';
import { BuyerComponent } from './component/buyer/buyer.component';
import { SellerComponent } from './component/seller/seller.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AddEditOrderComponent } from './component/order/add-edit-order/add-edit-order.component';
import { OrderComponent } from './component/order/order.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddEditBuyerComponent } from './component/buyer/add-edit-buyer/add-edit-buyer.component';
import { AddEditSellerComponent } from './component/seller/add-edit-seller/add-edit-seller.component';
import { AddEditRemittanceComponent } from './component/remittance-management/add-edit-remittance/add-edit-remittance.component';
import { PaymentManagementComponent } from './component/payment-management/payment-management.component';
import { AddEditPaymentComponent } from './component/payment-management/add-edit-payment/add-edit-payment.component';
import { RemittanceManagementComponent } from './component/remittance-management/remittance-management.component';
import { CommentComponent } from './component/comment/comment.component';
import { NewsComponent } from './component/news/news.component';
import { DetailNewsComponent } from './component/news/detail-news/detail-news.component';
const Components = [
  UserComponent
];

@NgModule({
  declarations: [
    AdminComponent,
    ...Components,
    BuyerComponent,
    SellerComponent,
    AddEditOrderComponent,
    OrderComponent,
    DashboardComponent,
    AddEditBuyerComponent,
    AddEditSellerComponent,
    AddEditRemittanceComponent,
    PaymentManagementComponent,
    AddEditPaymentComponent,
    RemittanceManagementComponent,
    CommentComponent,
    NewsComponent,
    DetailNewsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonAppModule.forRoot(),
    LayoutModule,
    NgxFileDropModule
  ]
})
export class AdminModule { }
