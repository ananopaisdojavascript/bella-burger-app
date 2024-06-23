import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/order';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private kitchenArray = new BehaviorSubject<IOrder[]>([])
  private orderArray = new BehaviorSubject<IOrder[]>([])

  kitchenArray$ = this.kitchenArray.asObservable();
  orderArray$ = this.orderArray.asObservable();

  http = inject(HttpClient);

  fetchOrders(url: string) {
    this.http.get<IOrder[]>(url).subscribe(data => {
      this.kitchenArray.next(data)
    })
  }

  addOrderToKitchenArray(url: string, order: IOrder) {
    return this.http.post<IOrder>(url, JSON.stringify(order)).subscribe(data => {
      const currentOrder = this.kitchenArray.getValue()
      currentOrder.push(data)
      return this.kitchenArray.next(currentOrder)
    })
  }

  transferToOrderArray(order: IOrder) {
    const kitchenArrayValue = this.kitchenArray.value
    const orderArrayValue = this.orderArray.value

    const updateKitchenArray = kitchenArrayValue.filter(item => item !== order)

    const updateOrderArray = [...orderArrayValue, order]

    this.kitchenArray.next(updateKitchenArray)
    this.orderArray.next(updateOrderArray)
  }
}