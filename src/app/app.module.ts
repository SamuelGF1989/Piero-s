;
import { Error404Component } from './pages/error404/error404.component'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';  // Importa ButtonModule
import { CarouselModule } from 'primeng/carousel'; // Importa CarouselModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Requerido para las animaciones
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from './pages/register/register.component';
import { TecnologiaComponent } from './pages/tecnologia/tecnologia.component';
import { BellezaComponent } from './pages/belleza/belleza.component';
import { AlimentosComponent } from './pages/alimentos/alimentos.component';
import { HogarComponent } from './pages/hogar/hogar.component';
import { ModaComponent } from './pages/moda/moda.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderListModule } from 'primeng/orderlist';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Error404Component,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TecnologiaComponent,
    BellezaComponent,
    AlimentosComponent,
    HogarComponent,
    ModaComponent,
    VehiculosComponent,
    CartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataViewModule,
    PaginatorModule,
    CardModule,
    TagModule,
    RouterModule,
    PasswordModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
