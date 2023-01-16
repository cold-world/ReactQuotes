import React, { useState, useRef, useContext } from 'react';
import Card from '../UI/Card';
import classes from './AuthForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setError(null);

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsLoading(true);
    if (isLogin) {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          res.json().then((data) => {
            login(data.idToken, data.email);
          });
          navigate('/quotes');
        } else {
          res.json().then((data) => {
            let errorMessage = 'Auth error';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            setError(errorMessage);
          });
        }
      });
    } else {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          res.json().then((data) => login(data.idToken, data.email));
          navigate('/quotes');
        } else {
          res.json().then((data) => {
            let errorMessage = 'Auth error';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            setError(errorMessage);
          });
        }
      });
    }
  };

  return (
    <>
      <h2>{isLogin ? 'Login' : 'Creating a new account'}</h2>
      <Card>
        {error && <p>{error}</p>}
        {isLoading && <LoadingSpinner />}
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.control}>
            <input ref={emailRef} type='email' placeholder='email' />
          </div>
          <div className={classes.control}>
            <input ref={passwordRef} type='password' placeholder='password' />
          </div>
          <div className={classes.actions}>
            <button className='btn'>Submit</button>
          </div>
        </form>
        <button onClick={() => setIsLogin((prev) => !prev)} className='btn--flat' type='button'>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </Card>
    </>
  );
};

export default AuthForm;
