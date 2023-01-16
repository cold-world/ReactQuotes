import { createContext, useState } from 'react';

const initialAuthState = {
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  email: '',
  setEmail: (email) => {},
};

export const AuthContext = createContext(initialAuthState);

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialEmail = localStorage.getItem('email');
  const [token, setToken] = useState(initialToken ?? null);
  const [email, setEmail] = useState(initialEmail ?? null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    email,
    setEmail: emailHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
