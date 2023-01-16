import React, { useContext } from 'react';
import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const MainNavigation = () => {
  const { isLoggedIn, logout, email } = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <p className={classes.logo}>ReactQuotes</p>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/quotes' className={(navData) => (navData.isActive ? classes.active : '')}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/add-quote'
              className={(navData) => (navData.isActive ? classes.active : '')}
            >
              Add a Quote
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink
                to='/login'
                className={(navData) => (navData.isActive ? classes.active : '')}
              >
                Login
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logout}>
                Logout <span>({email})</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
