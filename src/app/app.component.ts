import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './services/shared.service';
import { orderUrl } from './models/order';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  sharedService = inject(SharedService)

  ngOnInit(): void {
    this.sharedService.fetchOrders(orderUrl)
  }
}
