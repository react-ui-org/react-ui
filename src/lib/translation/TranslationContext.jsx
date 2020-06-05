import React from 'react';

const TranslationContext = React.createContext({
  translations: {
    Alert: {
      close: 'Close',
    },
    ForgotPassword: {
      email: 'E-mail',
      resetPassword: 'Reset password',
    },
    Login: {
      email: 'E-mail',
      invalidUsernameOrPassword: 'Invalid username or password',
      password: 'Password',
      signIn: 'Sign in',
    },
    Modal: {
      close: 'Close',
    },
    NewPassword: {
      changePassword: 'Change password',
      newPassword: 'New password',
      repeatNewPassword: 'Repeat new password',
    },
  },
});

export default TranslationContext;
