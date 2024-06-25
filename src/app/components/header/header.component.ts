import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { DineroService } from '../../services/dinero.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isAuthenticated = false;
  username: string | null = null; // Variable para almacenar el nombre de usuario
  money: number | null = null;

  constructor(private loginService: LoginService, private moneyService:DineroService) { }

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.loginService.getAuthentication().subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        console.log(this.username)
        // Obtener el nombre de usuario si está autenticado
        this.username = this.loginService.getUsername();
        this.loadMoney();
      } else {
        console.log("sesion cerrada")
        this.money = null;
        this.username = null;
      }
    });
  }

  loadMoney(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.moneyService.getMoneyForUser(username).subscribe(money => {
        this.money = parseFloat(money);
      });
    }
  }

  onLogoutClick(): void {
    // Llamar al método de cierre de sesión en el servicio de inicio de sesión
    this.loginService.logout().subscribe({
      next: response => {
        if (response.success) {
          // Manejar el éxito del cierre de sesión
        }
      },
      error: error => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}
