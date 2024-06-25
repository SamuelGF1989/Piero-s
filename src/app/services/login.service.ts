import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/backend/login.php';
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Leer la cookie al inicializar el servicio
    this.checkCookie();
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`;
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      tap(response => {
        if (response.success) {
          console.log('Éxito en el inicio de sesión');
          this.setCookie('authenticated', 'true');
          this.setCookie('username', credentials.username);
          this.setAuthentication(true);
        } else {
          this.setAuthentication(false);
        }
      })
    );
  }

  checkSession(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/check_session.php`).pipe(
      map(response => {
        if (response && response.success) {
          return true; // El usuario está autenticado
        } else {
          return false; // El usuario no está autenticado
        }
      }),
      catchError(error => {
        console.error('Error al comprobar la sesión:', error);
        return of(false);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout.php`, {}).pipe(
      tap(() => {
        this.setCookie('authenticated', 'false');
        this.setAuthentication(false);
      }),
      catchError(error => {
        console.error('Error al cerrar la sesión:', error);
        return of({ success: false, message: 'Hubo un error al cerrar sesión. Por favor, inténtalo de nuevo.' });
      })
    );
  }

  private checkCookie() {
    const isAuthenticated = this.getCookie('authenticated');
    if (isAuthenticated === 'true') {
      this.setAuthentication(true);
    }
  }

  private setCookie(name: string, value: string) {
    const expires = 'expires=' + new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  private getCookie(name: string): string | null {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || null : null;
  }

  setAuthentication(status: boolean) {
    this.isAuthenticated.next(status);
  }

  getAuthentication(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUsername(): string | null {
    return this.getCookie('username');
  }

}
