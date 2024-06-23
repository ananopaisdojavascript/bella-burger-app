import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./login/login.component").then(m => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./register/register.component").then(m => m.RegisterComponent)
  },
  {
    path: "salon",
    loadComponent: () => import("./salon/salon.component").then(m => m.SalonComponent),
    canActivate: [authGuard]
  },
  {
    path: "kitchen",
    loadComponent: () => import("./kitchen/kitchen.component").then(m => m.KitchenComponent),
    canActivate: [authGuard]
  },
  {
    path: "orders",
    loadComponent: () => import("./orders/orders.component").then(m => m.OrdersComponent),
    canActivate: [authGuard]
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];
