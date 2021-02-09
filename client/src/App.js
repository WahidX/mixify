import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PlayListPage from './components/PlaylistPage';
import PlaylistCreate from './components/PlaylistCreate';
import Page404 from './components/Page404';

import { AppDataProvider } from './contexts/AppDataContext';

function App(props) {
  return (
    <AppDataProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/playlist" component={PlayListPage} />
          <Route exact path="/create" component={PlaylistCreate} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </AppDataProvider>
  );
}

export default App;
