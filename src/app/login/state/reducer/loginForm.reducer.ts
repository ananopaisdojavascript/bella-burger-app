import { Action, createReducer, on } from "@ngrx/store";
import { ILoginFormState, initialLoginFormState } from "../../../models/loginForm";
import { login } from "../action/loginForm.action";

const loginFormReducer = createReducer(
  initialLoginFormState,
  on(login, (state, {type, ...update}) => ({
    ...state, ...update
  }))
)

export function reducer(state: ILoginFormState | undefined, action: Action) {
  return loginFormReducer(state, action);
}