import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private loginService: LoginService) { }

  onLoginClick(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(credentials)
      .subscribe(response => {
        // Manejar la respuesta del servidor aquí
        console.log(response);
      }, (error: any) => { // Especifica el tipo de 'error' como 'any'
        console.error('Error al iniciar sesión:', error);
      });
  }
}
