import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../productservice.service';
import { Message } from 'primeng/api/message';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-hogar',
  templateUrl: './hogar.component.html',
  styleUrl: './hogar.component.css'
})
export class HogarComponent {

  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10; // Cambia este valor según la cantidad de productos que quieras mostrar por página

  constructor(private productsService: ProductsService, private carritoService: CarritoService) { }


  carrito: any[] = [];
  messages: Message[] = [];

  ngOnInit(): void {
    this.productsService.getFurniture()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.paginateProducts();
      });
  }

  agregarAlCarrito(product: any) {
    this.carritoService.addProductToCart(product);
    this.showMessage();
  }

  showMessage() {
    this.messages = [
      { severity: 'success', summary: 'Éxito', detail: 'Producto agregado al carrito' }
    ];

    // Opción para ocultar automáticamente el mensaje después de un tiempo
    setTimeout(() => {
      this.messages = [];
    }, 3000); // Ocultar mensaje después de 3 segundos
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
