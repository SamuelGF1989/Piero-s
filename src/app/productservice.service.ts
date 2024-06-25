import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environments } from './environment';
import { Product, Products } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient:HttpClient) { }


  getProducts():Observable<Product[]>{
    const url = `${this.baseUrl}products?limit=100`;
    return this.httpClient.get<Products>(url).pipe(
      map<Products,Product[]>((response:Products) => response.products)
    );
  }

  getBeauty():Observable<Product[]>{
    const url = `${this.baseUrl}products/category/beauty`;
    return this.httpClient.get<Products>(url).pipe(
      map<Products,Product[]>((response:Products) => response.products)
    );
  }


  getTech():Observable<Product[]>{
    const url = `${this.baseUrl}products/category/mobile-accessories`;
    return this.httpClient.get<Products>(url).pipe(
      map<Products,Product[]>((response:Products) => response.products)
    );
  }
  getFood():Observable<Product[]>{
    const url = `${this.baseUrl}products/category/groceries`;
    return this.httpClient.get<Products>(url).pipe(
      map<Products,Product[]>((response:Products) => response.products)
    );
  }

  getFurniture():Observable<Product[]>{
    const url = `${this.baseUrl}products/category/furniture`;
    return this.httpClient.get<Products>(url).pipe(
      map<Products,Product[]>((response:Products) => response.products)
    );
  }

  getClothes():Observable<Product[]>{
    const url = `${this.baseUrl}products/category/mens-shirts`;
    return this.httpClient.get<Products>(url).pipe(
      map<Products,Product[]>((response:Products) => response.products)
    );
  }

}
