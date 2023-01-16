import React, { useEffect } from 'react';
import QuoteForm from '../quotes/QuoteForm';
import useHttp from '../../hooks/use-http';
import { addQuote } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const NewQuote = () => {
  const { error, status, sendRequest } = useHttp(addQuote);
  const navigate = useNavigate();

  const addQuoteHandler = (quote) => {
    sendRequest(quote);
  };

  useEffect(() => {
    if (status === 'completed' && !error) {
      navigate('/quotes');
    }
  }, [status, error, navigate]);

  if (status === 'completed' && error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      <QuoteForm isLoading={status === 'pending'} addQuoteHandler={addQuoteHandler} />
    </>
  );
};

export default NewQuote;
