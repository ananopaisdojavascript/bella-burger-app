import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { using } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { login } from './state/action/loginForm.action';
import { ILoginFormState, initialLoginFormState } from './state/loginForm';
import { PatchFormGroupValuesDirectiveModule } from '../utils/formValue.module';
import { AuthService } from '../auth/auth.service';

const modules = [
  CommonModule, 
  ReactiveFormsModule, 
  PatchFormGroupValuesDirectiveModule,
  RouterModule
]
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...modules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  route = inject(Router);

  store = inject(Store<ILoginFormState>);

  authService = inject(AuthService);

  isSubmitted = false;

  errorMessage = "Esse campo é obrigatório.";

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    kitchen: new FormControl(false, Validators.required),
    salon: new FormControl(false, Validators.required)
  })

  valueChange$ = this.loginForm.valueChanges.pipe(
    tap((value: any) => this.store.dispatch(login(value)))
  )

  loginFormValues$ = using(
    () =>
      this.loginForm.valueChanges
        .pipe(tap((values:any) => this.store.dispatch(login(values))))
        .subscribe(),
    () => this.store.select(state => state.form) 
  );

  onChange(event: Event): void {
    const ischecked = (<HTMLInputElement>event.target).checked
    console.log(ischecked)
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginFormValues: ILoginFormState = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
        kitchen: this.loginForm.value.kitchen!,
        salon: this.loginForm.value.salon!
      };
      console.log(loginFormValues);
      this.authService.createLogin(loginFormValues).subscribe((data: ILoginFormState) => {

        if (!this.authService.isLoggedIn()) {
          this.route.navigate(['/login']);
        } else {
          if(loginFormValues.kitchen) {
            this.route.navigate(['/kitchen']);
          } else if(loginFormValues.salon) {
            this.route.navigate(['/salon']);
          }
        }
        
        console.log(data)
      });
    }
    this.loginForm.setValue(initialLoginFormState);
  }


  goToRegisterPage(): void {
    this.route.navigate(['/register']);
  }
}
