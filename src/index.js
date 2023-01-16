import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import AuthContextProvider from './context/auth-context';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthContextProvider>
);
