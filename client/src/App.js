import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PlayListPage from './components/PlaylistPage';

import { TokenProvider } from './contexts/TokenContext';
import { LoadingProvider } from './contexts/LoadingContext';

function App(props) {
  return (
    <LoadingProvider>
      <TokenProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/playlist" component={PlayListPage} />
          </Switch>
        </Router>
      </TokenProvider>
    </LoadingProvider>
  );
}

export default App;
