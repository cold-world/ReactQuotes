import React, { Suspense, useContext } from 'react';
import Layout from './components/layout/Layout';
import { Route, Routes, Navigate } from 'react-router-dom';
import AllQuotes from './components/pages/AllQuotes';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Auth from './components/pages/Auth';
import { AuthContext } from './context/auth-context';

const NewQuote = React.lazy(() => import('./components/pages/NewQuote'));
const NotFound = React.lazy(() => import('./components/pages/NotFound'));
const QuoteDetail = React.lazy(() => import('./components/pages/QuoteDetail'));

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<Navigate to='/quotes' />} />
          <Route path='quotes' element={<AllQuotes />} />
          <Route path='add-quote' element={<NewQuote />} />
          {!isLoggedIn && <Route path='login' element={<Auth />} />}
          <Route path='quotes/:quoteId' element={<QuoteDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
