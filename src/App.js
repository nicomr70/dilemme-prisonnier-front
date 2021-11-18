import './App.css';
import React, {useEffect, useState} from 'react'
import ButtonJeu from "./component/buttonJeu/ButtonJeu";
import Strategy from "./component/Strategy/Strategy"
import TableauGame from "./component/TableauGame/TableauGame";
import CreateGame from "./component/CreateGame/CreateGame";
import ResumeGame from "./component/ResumeGame/ResumeGame";
import {Game} from "./component/Game/Game";

export const ADDRSERVEUR="http://localhost:2200"
export const ADDRSERVEURGAME = ADDRSERVEUR + "/game"

const st= {
    jeu : 1 ,
    pointJ1 : 3,
    pointJ2 : 1
}

function App() {


  return (
    <div className="App">
        <Game/>
    </div>
  );
}

export default App;
