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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Error404Component,
    FooterComponent,

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
    TagModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
