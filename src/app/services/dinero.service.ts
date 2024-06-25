import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DineroService {

  private apiUrl = 'http://localhost:3000/backend/dinero.php'; // Reemplaza con la URL de tu script PHP

  constructor(private http: HttpClient) { }

  getMoneyForUser(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, { username }, { headers });
  }
}
