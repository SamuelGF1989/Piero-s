import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = 'https://dummyjson.com/carts';
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$: Observable<any[]> = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  addProductToCart(product: any) {
    this.cartSubject.next([...this.cartSubject.getValue(), product]);
  }

  getCart() {
    return this.cartSubject.getValue();
  }

  addCart(userId: number, products: any[]) {
    const body = {
      userId,
      products
    };
    return this.http.post(`${this.apiUrl}/add`, body);
  }

  clearCart() {
    this.cartSubject.next([]);
  }
}
