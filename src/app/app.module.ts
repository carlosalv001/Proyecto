import { environment } from './../environments/environment';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AuthService } from '@auth/services/auth.service';
import { CanSuscriptorGuard } from '@app/auth/guards/can-suscriptor.guard';
import { CanAdminGuard } from '@auth/guards/can-admin.guard';
import { CanEditGuard } from '@auth/guards/can-edit.guard';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';
//import { LoginComponent } from './components/login/login.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import{AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import {ProductService} from './services/product.service';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [AppComponent, NavbarComponent, SendEmailComponent,
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    //LoginComponent,
    ViajesComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule, 
    SweetAlert2Module.forRoot(),
   
   
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [AuthService, CanEditGuard, CanAdminGuard, CanSuscriptorGuard, ProductService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
