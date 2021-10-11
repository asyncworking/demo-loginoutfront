// export const BASE_URL = 'https://5671422e-8a49-426a-a2bf-c2cb79c047fe.mock.pstmn.io/api/v1';
export const BASE_URL = 'http://localhost:8080/api/v1';
export const API_COMPANY_INFO = `${BASE_URL}/company`;
export const API_EMPLOYEE_INFO = `${BASE_URL}/employee`;
export default {
  nameInput: {
    label: 'Name',
    name: 'name',
    variant: 'outlined',
    margin: 'normal',
    required: true,
    fullWidth: true,
    id: 'name',
    autoFocus: true,
    autoComplete: 'name',
  },
  emailInput: {
    label: 'Email',
    name: 'email',
    variant: 'outlined',
    margin: 'normal',
    disabled: true,
    fullWidth: true,
    id: 'email',
    autoComplete: 'email',
  },
  passwordInput: {
    'data-testid': 'passwordInput',
    label: 'Password',
    variant: 'outlined',
    margin: 'normal',
    required: true,
    fullWidth: true,
    id: 'password',
    type: 'password',
    name: 'password',
    autoComplete: 'current-password',
  },
  confirmPasswordInput: {
    'data-testid': 'confirmPasswordInput',
    label: 'Confirm Password',
    variant: 'outlined',
    margin: 'normal',
    required: true,
    fullWidth: true,
    id: 'confirmPassword',
    type: 'password',
    name: 'confirmPassword',
    autoComplete: 'current-password',
  },
};
