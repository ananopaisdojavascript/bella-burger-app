export interface ILoginFormState {
  email: string;
  password: string;
  salon: boolean;
  kitchen: boolean;
}

export const initialLoginFormState: ILoginFormState = {
  email: '',
  password: '',
  salon: false,
  kitchen: false,
}