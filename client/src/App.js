import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Material UI - theme
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { cyan, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import Home from './components/Home';
import PlayListPage from './components/PlaylistPage';
import PlaylistCreate from './components/PlaylistCreate';
import Page404 from './components/Page404';
import Header from './components/shared/Header';
import InviteRoom from './components/InviteRoom';

import { AppDataProvider } from './contexts/AppDataContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: red[600],
    },
    error: {
      main: cyan[500],
    },
  },
});

function App(props) {
  return (
    <AppDataProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/playlist" component={PlayListPage} />
            <Route exact path="/create" component={PlaylistCreate} />
            <Route path="/room" component={InviteRoom} />
            <Route component={Page404} />
          </Switch>
        </ThemeProvider>
      </Router>
    </AppDataProvider>
  );
}

export default App;
