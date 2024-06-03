import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { reducer } from './login/state/reducer/loginForm.reducer';
import { registerReducer } from './register/state/reducer/registerForm.reducer';

const providers = [
  provideRouter(routes),
  provideHttpClient(),
  provideStore(),
  provideState({ name: 'login', reducer: reducer }),
  provideState({ name:'register', reducer: registerReducer })
]

export const appConfig: ApplicationConfig = {
  providers: [...providers]
};
