import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Observable } from 'rxjs';
import { DinerorestaService } from '../../dineroresta.service';
import { LoginService } from '../../services/login.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart!: Observable<any[]>;

  constructor(private carritoService: CarritoService, private dineroRestaService: DinerorestaService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.cart = this.carritoService.cart$;
  }

  getTotal(): number {
    let total = 0;
    this.cart.subscribe(products => {
      products.forEach(product => {
        total += product.price;
      });
    });
    return total;
  }

  buyItems(): void {
    const total = this.getTotal();
    const username = this.loginService.getUsername();
    if (username && total > 0) {
      this.dineroRestaService.buyItems(username, total).subscribe(
        () => {
          alert('Compra realizada con éxito!');
          this.generatePDF(); // Generar PDF después de la compra exitosa
          // Lógica adicional después de una compra exitosa, como limpiar el carrito, etc.
        },
        error => {
          console.error('Error al restar dinero:', error);
          alert('Error al realizar la compra. Por favor, inténtelo de nuevo más tarde.');
        }
      );
    } else {
      alert('No se puede realizar la compra. Asegúrate de haber iniciado sesión y de tener productos en el carrito.');
    }
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const cartData: string[][] = [];
    let totalPrice = 0; // Inicializamos el precio total como cero

    // Obtener datos del carrito y calcular el precio total
    this.cart.subscribe(products => {
      products.forEach(product => {
        cartData.push([product.title, product.price.toString()]);
        totalPrice += product.price; // Sumamos el precio de cada producto al precio total
      });
    });

    // Agregar el precio total como una fila adicional al final de la tabla
    cartData.push(['Total', totalPrice.toFixed(2)]); // Ajustamos el total a dos decimales

    // Definir encabezado y formato de la tabla
    const headers: string[][] = [['Product', 'Price']];

    // Generar el PDF con los datos del carrito
    doc.text('Carrito de compras', 10, 10);
    (doc as any).autoTable({
      startY: 20,
      head: headers,
      body: cartData
    });

    // Guardar el PDF con un nombre único
    const fileName = 'cart_' + new Date().getTime() + '.pdf';
    doc.save(fileName);
  }

}
