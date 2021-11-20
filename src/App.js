import './App.css';
import React from 'react'
import {useNavigate} from "react-router-dom";

export const ADDRSERVEUR="http://localhost:2200"
export const ADDRSERVEURGAME = ADDRSERVEUR + "/game"


function App() {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate("/home")
    }

  return (
    <div className="App">
        <h1>Bienvenue dans le jeu du dilemme du prisonnier</h1>
        <button onClick={handleClick}>Commencer à jouer</button>
    </div>
  );
}

export default App;