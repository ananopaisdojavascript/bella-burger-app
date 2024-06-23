import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order';

const url = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient)

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${url}/orders`)
  }

  getOrder(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${url}/orders/${id}`)
  }

  createOrders(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${url}/orders`, order)
  }
}
