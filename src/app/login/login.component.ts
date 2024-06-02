import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { using } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from './state/action/loginForm.action';
import { ILoginFormState } from './state/loginForm';
import { PatchFormGroupValuesDirectiveModule } from './state/loginFormValue.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PatchFormGroupValuesDirectiveModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  route = inject(Router);

  store = inject(Store<ILoginFormState>)

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
    console.log(
      'submitted form',
      this.loginForm.value
    );
    this.loginForm.setValue(
      { email: "", password: "", salon: false, kitchen: false}
    )
  }


  goToRegisterPage(): void {
    this.route.navigate(['/register']);
  }
}
