import './style/App.scss';
import { BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './components/home/mainpage.jsx';
import Join from './components/home/join';
import Start from './components/home/start';
import Error from './components/ui-components/error';
import Game from './components/game/game';
import socketClient from "socket.io-client";
// import Game from './components/game/game';
// import Result from './components/results/results';

const SERVER = "http://127.0.0.1:8080";
function App() {
  var socket = socketClient(SERVER);
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
  });


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
