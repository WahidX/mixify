import React, { createContext, useState } from 'react';

export const TokenContext = createContext();

export const TokenProvider = (props) => {
  const [token, setToken] = useState('');
  // const [loading, setLoading] = useState(false);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {props.children}
    </TokenContext.Provider>
  );
};
