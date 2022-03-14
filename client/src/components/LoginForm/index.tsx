import React from 'react';
import LoginForm from './LoginForm';
import {ModeTypes} from './ModeSelect';
import RegisterForm from './RegisterForm';

export type AuthenticationFormsProps = {
  mode: ModeTypes;
  setUserId: (value: string) => void;
};
const AuthenticationForms: React.FC<AuthenticationFormsProps> = ({
  mode,
  setUserId,
}) => {
  switch (mode) {
    case 'login':
      return <LoginForm setUserId={setUserId} />;
    case 'signup':
      return <RegisterForm setUserId={setUserId} />;
    default:
      return <RegisterForm setUserId={setUserId} />;
  }
};

export default AuthenticationForms;
