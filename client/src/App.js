import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PlayListPage from './components/PlaylistPage';

import { AppDataProvider } from './contexts/AppDataContext';

function App(props) {
  return (
    <AppDataProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/playlist" component={PlayListPage} />
        </Switch>
      </Router>
    </AppDataProvider>
  );
}

export default App;
