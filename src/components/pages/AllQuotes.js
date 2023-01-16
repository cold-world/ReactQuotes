import React from 'react';
import QuoteList from '../quotes/QuoteList';
import useHttp from '../../hooks/use-http';
import { useEffect } from 'react';
import { getAllQuotes } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '..//quotes/NoQuotesFound';

const AllQuotes = () => {
  const { sendRequest, data, status, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && (!data || data.length === 0)) {
    return <NoQuotesFound />;
  }

  return (
    <>
      <h1>AllQuotes</h1>
      <QuoteList quotes={data} />
    </>
  );
};

export default AllQuotes;
