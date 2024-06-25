import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  this.loginService.checkSession().subscribe(isAuthenticated => {
    if (isAuthenticated) {
      // La sesión es válida, el usuario no necesita iniciar sesión
      console.log("Sesión válida.");
    } else {
      // La sesión no es válida, redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
  }, error => {
    console.error('Error al verificar la sesión:', error);
    // En caso de error, también redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  });
}

  onLoginClick(): void {
    this.loginService.login({ username: this.username, password: this.password }).subscribe({
      next: response => {
        if (response.success) {
          // Login successful, set authentication to true and redirect to dashboard
          this.loginService.setAuthentication(true);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message; // Show error message
        }
      },
      error: error => {
        console.error('Error during login:', error);
        this.errorMessage = 'Error durante el inicio de sesión. Por favor, inténtalo de nuevo.';
      }
    });
  }
}
