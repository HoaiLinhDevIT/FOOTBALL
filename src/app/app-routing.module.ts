import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesModel } from '@common/models';
import { RoleGuard } from '@core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthRoutingModule } from '../app/auth/auth-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TroubleLoggingComponent } from './pages/trouble-logging/trouble-logging.component';
import { TestChatboxComponent } from './pages/test-chatbox/test-chatbox.component';
import { ProductDetailComponent } from './pages/homepage/product-detail/product-detail.component';
import { PaymentComponent } from './pages/homepage/payment/payment.component';
import { ProductComponent } from './pages/homepage/product/product.component';
import { TutorialSizeComponent } from './pages/homepage/tutorial-size/tutorial-size.component';
import { NewsComponent } from './pages/homepage/news/news.component';
import { PitchComponent } from './pages/homepage/pitch/pitch.component';
import { PitchDetailComponent } from './pages/homepage/pitch/pitch-detail/pitch-detail.component';
import { CartComponent } from './pages/homepage/cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '', component: TutorialSizeComponent, children: [
      { path: 'tutorial', component: TutorialSizeComponent }
    ]
  },
  {
    path: '', component: CartComponent, children: [
      { path: 'cart', component: CartComponent }
    ]
  },
  {
    path: '', component: PitchComponent, children: [
      { path: 'pitch', component: PitchComponent }
    ]
  },
  {
    path: '', component: PitchDetailComponent, children: [
      { path: 'pitch-detail', component: PitchDetailComponent }
    ]
  },
  {
    path: '', component: NewsComponent, children: [
      { path: 'news', component: NewsComponent }
    ]
  },
  {
    path: '', component: HomepageComponent, children: [
      { path: 'home', component: HomepageComponent }
    ]
  },
  {
    path: '', component: ProductComponent, children: [
      { path: 'product', component: ProductComponent }
    ]
  },
  {
    path: '', component: ProductDetailComponent, children: [
      { path: 'product-detail', component: ProductDetailComponent }
    ]
  },
  {
    path: '', component: PaymentComponent, children: [
      { path: 'payment', component: PaymentComponent }
    ]
  },
  { path: 'trouble-logging', component: TroubleLoggingComponent },
  { path: 'test', component: TestChatboxComponent },
  {
    path: 'system',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [RolesModel.SYSTEM]
    },
    loadChildren: () => import('./pages/system/system.module').then((m) => m.SystemModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [RolesModel.ADMIN]
    },
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'customer',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [RolesModel.USER]
    },
    loadChildren: () => import('./pages/customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'exporter',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [RolesModel.EXPORTER]
    },
    loadChildren: () => import('./pages/exporter/exporter.module').then((m) => m.ExporterModule)
  }
];

@NgModule({
  imports: [
    AuthRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
