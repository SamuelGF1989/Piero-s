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

  constructor(private http: HttpClient) {
    // Cargar el carrito desde LocalStorage al iniciar el servicio
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  addProductToCart(product: any) {
    // Agregar producto al carrito y actualizar LocalStorage
    const updatedCart = [...this.cartSubject.getValue(), product];
    this.cartSubject.next(updatedCart);
    localStorage.setItem('carrito', JSON.stringify(updatedCart));
  }

  removeProductFromCart(index: number) {
    // Obtener el carrito actual
    const currentCart = this.cartSubject.getValue();

    // Filtrar el carrito para excluir el producto con el índice dado
    const updatedCart = currentCart.filter((item, i) => i !== index);

    // Emitir el nuevo valor del carrito
    this.cartSubject.next(updatedCart);

    // Actualizar LocalStorage con el nuevo carrito
    localStorage.setItem('carrito', JSON.stringify(updatedCart));
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
    // Limpiar el carrito y eliminarlo del LocalStorage
    this.cartSubject.next([]);
    localStorage.removeItem('carrito');
  }
}
