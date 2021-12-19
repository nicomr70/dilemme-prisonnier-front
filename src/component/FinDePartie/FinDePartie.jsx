import {useNavigate, useParams} from "react-router-dom";
import {loadGame} from "../Play/Play";
import {useEffect, useState} from "react";


export default function FinDePartie(){
    const navigate = useNavigate();
    const {gameId,playerName} = useParams();
    const [state,setState] = useState({score :"E",winner :{name :""}});
    useEffect(()=>{
        loadGame(gameId).then((g) => {
                    if (g.player1.score > g.player2.score) {
                        setState({score: "G",winner: g.player1})
                    }else if (g.player1.score < g.player2.score){
                        setState({score : "G",winner : g.player2})
                    }else{
                        setState({score : "E",winner: {name:""}})
                    }

            }).catch((e)=>console.log(e))
    },[])

    const handleClick=()=>{
        navigate("/home/"+playerName);
    }
    return<div>
        <p>Vous avez fini votre partie</p>
        <h1>{state.score != "E" ? state.winner.name+" à gagné !" : "Egalite"}</h1>
        <button onClick={handleClick}>retourner au menu</button>
    </div>
}