import { Injectable } from '@angular/core';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  items: IOrder[] = [];

  readyItems: IOrder[] = [];

  add(order: IOrder): void {
    this.items.push(order);
  }

  add2(order: IOrder): void {
    this.readyItems.push(order);
  }

  get(): IOrder[] {
    return this.items;
  }

  get2(): IOrder[] {
    return this.readyItems;
  }

  remove(id: number): void {
    this.items = this.items.filter(item => item.id === id);
  }

  remove2(id: number): void {
    this.readyItems = this.readyItems.filter(item => item.id === id);
  }


}
