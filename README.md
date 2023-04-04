ReactQuotes.
=======================================

React, Firebase Realtime DB and Firebase Auth.

Main goal -> auth/login, send data to DB.


* * *
### [Demo](https://cold-world.github.io/ReactQuotes)

![Alt Text](https://i.ibb.co/8M5x6Dn/2.gif)

* * *



### A piece of code

```
function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
```

### Download & Installation

```shell 
git clone https://github.com/cold-world/ReactQuotes.git
cd <project-dir>
npm install
npm start
```
