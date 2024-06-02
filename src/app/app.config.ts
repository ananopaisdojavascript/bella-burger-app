import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { reducer } from './login/state/reducer/loginForm.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(), provideState({ name: 'login', reducer: reducer })]
};
