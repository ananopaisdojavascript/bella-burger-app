import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';

const url = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${url}/products`)
  }
}
