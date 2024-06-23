import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { KitchenService } from '../services/kitchen.service';
// import { IOrder } from '../models/order';
// import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit{

  goToSalon(): void {
  }

  ngOnInit(): void {
  }
}
