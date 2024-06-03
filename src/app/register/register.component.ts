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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PatchFormGroupValuesDirectiveModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  route = inject(Router);

  store = inject(Store<IRegisterFormState>);

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
    console.log(
      'submitted form',
      this.registerForm.value,
      this.registerForm.valid,
      this.registerForm.invalid
    );
    this.isSubmitted = true;
    this.registerForm.setValue(initialRegisterFormState)
  }

  goToLoginPage(): void {
    this.route.navigate(['/login']);
  }
}
