import { Component } from '@angular/core';
import { ProductsService } from '../../productservice.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-moda',
  templateUrl: './moda.component.html',
  styleUrl: './moda.component.css'
})
export class ModaComponent {

  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10; // Cambia este valor según la cantidad de productos que quieras mostrar por página

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getClothes()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.paginateProducts();
      });
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
