import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DinerorestaService {

  private apiUrl = 'http://localhost:3000/backend/dinero.php'; // Actualiza con la URL correcta

  constructor(private http: HttpClient) {}

  getMoneyForUser(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, { username }, { headers });
  }

  buyItems(username: string, totalCost: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/restarDinero.php`, { username, totalCost });
  }
}
