import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SalonCartService {

  items: IProduct[] = [];

  add(product: IProduct): void {
    this.items.push(product);
  }

  get(): IProduct[] {
    return this.items;
  }

  remove(product: IProduct): void {
    this.items = this.items.filter((item) => item.productId !== product.productId);
  }

  incrementQuantity(id: number) {
    const item = this.items.find(i => i.productId === id)
    if(item) {
      item.quantity++
    }
  }

  decrementQuantity(id: number) {
    const item = this.items.find(i => i.productId === id)
    if(item) {
      item.quantity--
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }
}
