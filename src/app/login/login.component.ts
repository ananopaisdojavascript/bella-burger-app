import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule, Validators, UntypedFormControl } from '@angular/forms';
import { using } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { login } from './state/action/loginForm.action';
import { ILoginFormState } from '../models/loginForm';
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
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent {
  route = inject(Router);

  store = inject(Store<ILoginFormState>);

  authService = inject(AuthService);

  isSubmitted = false;

  errorMessage = "Esse campo é obrigatório.";

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
    salon: new UntypedFormControl(false, Validators.required),
    kitchen: new UntypedFormControl(false, Validators.required)
});
 
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
    if(this.loginForm.invalid) return;
    
    this.authService.createLogin(this.loginForm.value).subscribe((loginValue: Partial<ILoginFormState>) => {
      loginValue= this.loginForm.value;
      if(this.authService.isLoggedIn()) {
        if(loginValue.salon) {
          this.route.navigateByUrl('/salon')
        } else if(loginValue.kitchen) {
          this.route.navigateByUrl('/kitchen')
        }
      }
    })
  }


  goToRegisterPage(): void {
    this.route.navigate(['/register']);
  }
}
