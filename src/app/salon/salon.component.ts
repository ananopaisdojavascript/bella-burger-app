import { Component, inject, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product';
import { BrazilianRealPipe } from '../utils/pipes/brazilianReal.pipe';
import { ProductPipe } from '../utils/pipes/product.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [CommonModule, BrazilianRealPipe, ProductPipe],
  templateUrl: './salon.component.html',
  styleUrl: './salon.component.scss',
  providers: [ProductService, {provide: LOCALE_ID, useValue: 'pt-br' }],
})
export class SalonComponent implements OnInit {
  isTheModalOpened = false;

  products: IProduct[] = [] 

  productService = inject(ProductService);

  buttonArr = ['Café da manhã', 'Resto do dia']

  category = ''

  route = inject(Router);

  openModal():boolean {
    return this.isTheModalOpened = !this.isTheModalOpened;
  }

  closeModal():boolean {
    return this.isTheModalOpened =!this.isTheModalOpened;
  }

  selectProduct(value: string): void {
    this.category = value;
  }

  selectAll(): void {
    this.category = ''
  }

  goToLoginPage(): void {
    this.route.navigate(['/login']);
  }

  ngOnInit(): void{
    this.get();
  }

  get(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  
}
