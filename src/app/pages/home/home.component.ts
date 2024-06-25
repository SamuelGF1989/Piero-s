import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../productservice.service';
import { Product } from '../../interfaces/product.interface';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10; // Cambia este valor según la cantidad de productos que quieras mostrar por página

  constructor(private productsService: ProductsService, private carritoService: CarritoService) { }


  carrito: any[] = [];

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.paginateProducts();
      });
  }

  agregarAlCarrito(product: any) {
    this.carritoService.addProductToCart(product);
  }

  paginateProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.products.length);
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }
}
