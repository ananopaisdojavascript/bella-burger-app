import { createAction, props } from "@ngrx/store";
import { IRegisterFormState } from "../registerForm";

export const register = createAction(
  "[Register] Value Change",
  props<IRegisterFormState>()
);