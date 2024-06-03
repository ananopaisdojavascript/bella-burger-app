export interface IRegisterFormState {
    name: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    salon: boolean;
    kitchen: boolean;
}

export const initialRegisterFormState: IRegisterFormState = {
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    salon: false,
    kitchen: false,
}