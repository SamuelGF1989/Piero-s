import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BellezaComponent } from './pages/belleza/belleza.component';
import { TecnologiaComponent } from './pages/tecnologia/tecnologia.component';
import { AlimentosComponent } from './pages/alimentos/alimentos.component';
import { HogarComponent } from './pages/hogar/hogar.component';
import { ModaComponent } from './pages/moda/moda.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },

  {
    path: 'belleza', component:BellezaComponent
  },
  {
    path: 'tecnologia', component:TecnologiaComponent
  },

  {
    path: 'alimentos', component:AlimentosComponent
  },

  {
    path: 'hogar', component:HogarComponent
  },

  {
    path: 'moda', component:ModaComponent
  },

  {
    path: 'vehiculos', component:VehiculosComponent
  },

  {
    path: 'carrito', component:CartComponent
  },


  {path: '404',component:Error404Component},

  {
    path: '**',
    redirectTo: '404',
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
