import './style/App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/home/mainpage.jsx';
import Join from './components/home/join';
import Start from './components/home/start';
import Error from './components/ui-components/error';
// import Game from './components/game/game';
// import Result from './components/results/results';


function App() {
  return (
<main>
            <Switch>
            <Route path="/" component={MainPage} exact />
            <Route path="/join" component={Join} />
	          <Route path="/start" component={Start} />
            <Route component={Error} />
            </Switch>
        </main>
  );
}

export default App;
