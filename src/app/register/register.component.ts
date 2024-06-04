import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { using } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { register } from './state/action/registerForm.action';
import { IRegisterFormState, initialRegisterFormState } from './state/registerForm';
import { PatchFormGroupValuesDirectiveModule } from '../utils/formValue.module';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PatchFormGroupValuesDirectiveModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService]
})
export class RegisterComponent {
  route = inject(Router);

  store = inject(Store<IRegisterFormState>);

  authService = inject(AuthService);

  isSubmitted = false;

  errorMessage = "Esse campo é obrigatório.";

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    confirmEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    salon: new FormControl(false, Validators.required),
    kitchen: new FormControl(false, Validators.required)
  })

  valueChange$ = this.registerForm.valueChanges.pipe(
    tap((value: any) => this.store.dispatch(register(value)))
  )

  registerFormValues$ = using(
    () =>
      this.registerForm.valueChanges
        .pipe(tap((values:any) => this.store.dispatch(register(values))))
        .subscribe(),
    () => this.store.select(state => state.form) 
  );

  onChange(event: Event): void {
    const ischecked = (<HTMLInputElement>event.target).checked
    console.log(ischecked)
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerFormValues: IRegisterFormState = {
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        confirmEmail: this.registerForm.value.confirmEmail!,
        password:  this.registerForm.value.password!,
        confirmPassword: this.registerForm.value.confirmPassword!,
        salon: this.registerForm.value.salon!,
        kitchen: this.registerForm.value.kitchen!
      }
      console.log(registerFormValues);
      this.authService.createUser(registerFormValues).subscribe((_user: IRegisterFormState) => {
        if (!this.authService.isTheUserRegistered()) {
          this.route.navigate(['/register']);
        } else {
          if(registerFormValues.kitchen) {
            this.route.navigate(['/kitchen']);
          } else if(registerFormValues.salon) {
            this.route.navigate(['/salon']);
          }
        }
      })
    }

    this.isSubmitted = true;
    this.registerForm.setValue(initialRegisterFormState)
  }

  goToLoginPage(): void {
    this.route.navigate(['/login']);
  }
}
