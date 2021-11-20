import './App.css';
import React, {useRef} from 'react'
import {useNavigate} from "react-router-dom";

export const ADDRSERVEUR="http://localhost:2200"
export const ADDRSERVEURGAME = ADDRSERVEUR + "/game"


function App() {
    const pseudo = useRef();
    const navigate = useNavigate()
    const handleClick = ()=>{
        if(pseudo.current.value !==""){
            navigate("/home/"+pseudo.current.value);
        }else{
            alert("vous devez rentrer un psuedo pour continuer")
        }

    }

  return (
    <div className="App">
        <h1>Bienvenue dans le jeu du dilemme du prisonnier</h1>
        <div>
            <p>Votre pseudo :</p>
            <input type="text" ref={pseudo}/>
        </div>
        <button onClick={handleClick}>Commencer à jouer</button>
    </div>
  );
}

export default App;