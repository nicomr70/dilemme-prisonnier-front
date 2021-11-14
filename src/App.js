import './App.css';
import React, {useEffect, useState} from 'react'
import ButtonJeu from "./component/buttonJeu/ButtonJeu";
import Strategy from "./component/Strategy/Strategy"

export const ADDRSERVEUR="http://localhost:2200"
const st= {
    jeu : 1 ,
    pointJ1 : 3,
    pointJ2 : 1
}
let variable = 1;
function App() {


  return (
    <div className="App">
        <Game></Game>
    </div>
  );
}


function Game(){
    const [state,setState]= useState({b1 :false,b2:false,jeu:{...st}})
    useEffect(()=>{
        //faire un fetch pour l'état initial du jeu
    })

    const handleClick= async (response,id)=>{
        setState({...state,
            b1 : true,
            b2: true
        })

        await fetch(ADDRSERVEUR+"/jeu/jeu/id="+variable+"&prop="+response,{method : 'POST'})
        await fetch(ADDRSERVEUR+"/jeu/miseEnAttente").then((reponse)=>{
                setState({
                    b1 : false,
                    b2: false,
                    jeu:reponse
                })
            }
        )
        variable++;
    }

    return <>
        <ResumeGame jeu={state.jeu}></ResumeGame>
        <ButtonJeu  id ="c" onClick={handleClick} nameButton="cooperate" disabled={state.b1}></ButtonJeu>
        <ButtonJeu id="l" onClick={handleClick} nameButton="livery" disabled={state.b1}></ButtonJeu>
        <Strategy/>
    </>

}

function ResumeGame({jeu}){
        return <div>
            {JSON.stringify(jeu)}
        </div>
}

export default App;
