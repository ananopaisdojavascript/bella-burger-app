import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { IProduct } from '../models/product';
import { BrazilianRealPipe } from '../utils/pipes/brazilianReal.pipe';
import { ProductPipe } from '../utils/pipes/product.pipe';
import { Router } from '@angular/router';
import { UntypedFormGroup, ReactiveFormsModule, Validators, UntypedFormControl } from '@angular/forms';
import { SalonCartService } from '../services/salon-cart.service';
import { OrderService } from '../services/order.service';
import { IOrder, tableNumberArray, orderUrl } from '../models/order';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user';
import { KitchenService } from '../services/kitchen.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [CommonModule, BrazilianRealPipe, ProductPipe, ReactiveFormsModule],
  templateUrl: './salon.component.html',
  styleUrl: './salon.component.scss'
})
export class SalonComponent implements OnInit {
  products: IProduct[] = []
 
  users: IUser[] = []

  orders: IOrder[] = []

  tableArr = tableNumberArray;

  userService = inject(UserService);

  productService = inject(ProductService);

  kitchenService = inject(KitchenService);

  sharedService = inject(SharedService);

  salonCartService = inject(SalonCartService);

  route = inject(Router);

  buttonArr = ['Café da manhã', 'Resto do dia']

  category = ''

  isTheModalOpened = false;

  orderForm = new UntypedFormGroup({
    server: new UntypedFormControl('', Validators.required),
    client: new UntypedFormControl('', Validators.required),
    table_number: new UntypedFormControl(this.tableArr, Validators.required),
    productName: new UntypedFormControl(this.products.filter(product => product.name), Validators.required),
    productId: new UntypedFormControl(this.products.filter(product => product.productId), Validators.required),
    quantity: new UntypedFormControl(1, Validators.required)
  })

  addOrder() {
    if(this.orderForm.valid) {
      this.sharedService.addOrderToKitchenArray(orderUrl, this.orderForm.value)
    }
  }

  onChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const value = parseInt(element.value);
    return value;
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

  goToOrders() {
    this.route.navigate(['/orders'])
  }

  addtoCart(product: IProduct) {
    return this.salonCartService.add(product);
  }

  deleteFromCart(item: IProduct) {
    return this.salonCartService.remove(item);
  }

  increment(id: number) {
    this.salonCartService.incrementQuantity(id);
  }

  decrement(id: number) {
    this.salonCartService.decrementQuantity(id);
  }

  openModalWindow() {
    this.isTheModalOpened = !this.isTheModalOpened;
  }

  closeModalWindow() {
    this.isTheModalOpened = !this.isTheModalOpened
  }

  ngOnInit(): void{
    this.get();
    // this.salonUsers();
  }

  get(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // salonUsers(): void {
  //   this.userService.getUsers().subscribe((data) => {
  //     this.users = data.filter(user => user.salon)
  //   });
  // }

}
