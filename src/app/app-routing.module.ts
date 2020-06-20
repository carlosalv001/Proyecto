import { CanAdminGuard } from '@auth/guards/can-admin.guard';
import { CanSuscriptorGuard } from '@auth/guards/can-suscriptor.guard';
import { CanEditGuard } from '@auth/guards/can-edit.guard';
import { SendEmailComponent } from '@auth/send-email/send-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/products/product/product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import {ContactoComponent} from './components/contacto/contacto.component';

const routes: Routes = [
  {path:'viajes',component:ProductComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'listaviajes',component:ProductListComponent},
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'verification-email',
    component: SendEmailComponent,
  },
  
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
