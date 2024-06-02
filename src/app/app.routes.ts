import { Routes } from '@angular/router';

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
    loadComponent: () => import("./salon/salon.component").then(m => m.SalonComponent)
  },
  {
    path: "kitchen",
    loadComponent: () => import("./kitchen/kitchen.component").then(m => m.KitchenComponent)
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];
