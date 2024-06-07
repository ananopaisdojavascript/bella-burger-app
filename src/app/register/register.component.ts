import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { using } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { register } from './state/action/registerForm.action';
import { IRegisterFormState, initialRegisterFormState } from '../models/registerForm';
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

  registerForm = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.required),
    confirmEmail: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
    confirmPassword: new UntypedFormControl('', Validators.required),
    salon: new UntypedFormControl(false, Validators.required),
    kitchen: new UntypedFormControl(false, Validators.required)
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
    if(this.registerForm.invalid) return;

    this.authService.createUser(this.registerForm.value).subscribe((registerValue: IRegisterFormState) => {
      registerValue = this.registerForm.value;

      if(this.authService.isTheUserRegistered()) {
        if (registerValue.kitchen) {
          this.route.navigateByUrl('/kitchen')
        } else if(registerValue.salon) {
          this.route.navigateByUrl('/salon')
        }
      }
    })
  }

  goToLoginPage(): void {
    this.route.navigate(['/login']);
  }
}
