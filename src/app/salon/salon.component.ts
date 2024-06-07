import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product';

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salon.component.html',
  styleUrl: './salon.component.scss',
  providers: [ProductService],
})
export class SalonComponent implements OnInit {
  isTheModalOpened = false;

  products: IProduct[] = [] 

  productService = inject(ProductService);

  openModal():boolean {
    return this.isTheModalOpened = !this.isTheModalOpened;
  }

  closeModal():boolean {
    return this.isTheModalOpened =!this.isTheModalOpened;
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
