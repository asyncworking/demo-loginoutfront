const formConfig = {
  emailInput: {
    label: 'Email',
    name: 'email',
    variant: 'outlined',
    margin: 'normal',
    fullWidth: true,
    id: 'email',
    autoFocus: true,
    autoComplete: 'email',
    placeholder: 'name@asyncworking.com',
  },
  passwordInput: {
    'data-testid': 'passwordInput',
    label: 'Password',
    variant: 'outlined',
    margin: 'normal',
    fullWidth: true,
    id: 'password',
    type: 'password',
    name: 'password',
    autoComplete: 'current-password',
    placeholder: 'your password',
  },
  rememberInput: {
    label: 'Remember me',
    name: 'remember',
  },
};

export default formConfig;
