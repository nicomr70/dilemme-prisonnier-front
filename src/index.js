import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Home from "./component/Home/Home";
import Play from "./component/Play/Play";
import WaitLastPlayer from "./component/WaitLastPlayer/WaitLastPlayer";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route  path="/" element={<App/>}/>
              <Route path="/game/waitLastPlayer/:gameId" element={<WaitLastPlayer/>}/>
              <Route path="/waitPlayerPlay" element={null}/>
              <Route path="/game/:gameId/play/:playerId" element={<Play/>}/>
              <Route path="/home/:idGame" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
