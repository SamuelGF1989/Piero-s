import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  onRegisterClick(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return;
    }

    this.registerService.register({ username: this.username, password: this.password }).subscribe({
      next: response => {
        if (response.success) {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']);
        } else {
          if (response.message === 'El nombre de usuario ya existe') {
            this.errorMessage = 'El nombre de usuario ya existe. Por favor, elija otro.';
          } else {
            this.errorMessage = response.message;
          }
        }
      },
      error: error => {
        console.error('Error durante el registro:', error);
        this.errorMessage = 'Error al registrar. Inténtalo de nuevo.';
      }
    });
  }
}
