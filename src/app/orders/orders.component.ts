import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { IOrder } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit  {
  sharedService = inject(SharedService);

  ready: IOrder[] = [];

  route = inject(Router);

  goToMenu() {
    this.route.navigate(['/salon']);
  }

  ngOnInit(): void {
    this.sharedService.secondArray.subscribe(data => {
      this.ready = data;
      console.log(data)
    })
  }
}
