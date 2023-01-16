import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HighlightedQuote from '../quotes/HighlightedQuote';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';
import Comments from '../comments/Comments';

const QuoteDetail = () => {
  const params = useParams();
  const [showComments, setShowComments] = useState(false);
  const { data, status, error, sendRequest } = useHttp(getSingleQuote, true);

  const { quoteId } = params;


  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

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

  if (status === 'completed' && !data.text) {
    return <p>Error page 404</p>;
  }
  return (
    <>
      <HighlightedQuote key={data.id} text={data.text} author={data.author} />
      <button className='btn--flat centered' onClick={() => setShowComments((prev) => !prev)}>
        {showComments ? 'Hide comments' : 'Show comments'}
      </button>
      {showComments && <Comments quoteId={quoteId} />}
    </>
  );
};

export default QuoteDetail;
