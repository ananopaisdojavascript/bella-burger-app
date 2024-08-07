import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../models/order';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-kitchen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss'
})
export class KitchenComponent implements OnInit, OnDestroy {

  isTheModalOpened = false;

  route = inject(Router)

  kitchenOrdersArr: IOrder[] = []

  orderService = inject(OrderService);

  sharedService = inject(SharedService);

  goBackToKitchen() {
    this.closeModalWindow()
  }
  goToLoginPage() {
    this.route.navigate(['/login'])
  }

  openModalWindow() {
    this.isTheModalOpened = !this.isTheModalOpened;
  }

  closeModalWindow() {
    this.isTheModalOpened = !this.isTheModalOpened
  }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.sharedService.firstArray.subscribe(data => {
      this.kitchenOrdersArr = data
    })
  }

  transferOrders(order: any): void {
    this.sharedService.transferItemToSecondArray(order)
    console.log(order)
  }

  reload() {
    window.location.reload()
  }

  ngOnDestroy(): void {
  }
}
