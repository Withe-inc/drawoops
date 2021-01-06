import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import MainPage from './components/home/mainpage.jsx';
import Join from './components/home/join';
import Start from './components/home/start';
import Game from './components/game/game';
import Result from './components/results/results';



export default (
	<Route path="/" component={App}>
	  <IndexRoute component={MainPage} />
	  <Route path="/join" component={Join} />
	  <Route path="/start" component={Start} />
	</Route>
  );
