import { createAction, props } from "@ngrx/store";
import { ILoginFormState } from "../loginForm";

export const login = createAction(
  "[Login] Value Change",
  props<ILoginFormState>()
);