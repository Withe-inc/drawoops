import './style/App.scss';
import { BrowserRouter, Route, Switch, useRouteMatch} from 'react-router-dom';
import MainPage from './components/home/mainpage.jsx';
import Join from './components/home/join';
import Start from './components/home/start';
import Error from './components/ui-components/error';
import Game from './components/game/game';
// import Result from './components/results/results';


function App() {
  const match = useRouteMatch()
  console.log(match)
  return (
<main>
            <Switch>
            <Route path={`${match.url}`} component={MainPage} exact />
            <Route path={`${match.url}join`} component={Join} />
	          <Route path={`${match.url}start`} component={Start} />
            <Route pate={`${match.url}game`} component ={Game}/>
            <Route component={Error} />
            </Switch>
        </main>
  );
}

export default App;
