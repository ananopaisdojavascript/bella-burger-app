import { Action, createReducer, on } from "@ngrx/store";
import { IRegisterFormState, initialRegisterFormState } from "../registerForm";
import { register } from "../action/registerForm.action";

const registerFormReducer = createReducer(
    initialRegisterFormState,
    on(register, (state, {type, ...update}) => ({
        ...state, ...update
    }))
)

export function registerReducer(state: IRegisterFormState | undefined, action: Action) {
    return registerFormReducer(state, action);
}