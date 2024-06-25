import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../productservice.service';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrl: './alimentos.component.css'
})
export class AlimentosComponent {

  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10; // Cambia este valor según la cantidad de productos que quieras mostrar por página

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getFood()
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
