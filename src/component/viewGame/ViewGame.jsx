import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ADDRSERVEURGAME} from "../../App";
import {Game} from "../Game/Game";
import {loadGame} from "../Play/Play";

export default function ViewGame(){
    const {gameId,playerId} = useParams();
    const [state, setState] = useState({});
    const navigate = useNavigate();



    useEffect(()=>{
        loadGame(gameId).then((g)=>
            setState(g)
        )
        const eventGame =  new EventSource(ADDRSERVEURGAME + "/viewGame/"+gameId)
        eventGame.onopen = ()=>console.log("connexion au server ouverte")

        eventGame.onmessage = (g)=>{
            const game = JSON.parse(g.data)
            const player = game.player1.id === playerId ? game.player1 : game.player2
            console.log(player)
            if(game?.turnCount === game?.maxTurnCount){
                navigate("/game/"+gameId+"/end/"+player.name)
            }
            setState((state) => {return game})
        }
        eventGame.onerror = (e)=>{
            alert("une erreur c'est produite avec le serveur \n raison : "+JSON.stringify(e));
            eventGame.close()
        }

        return ()=>{
            eventGame.close()
        }
    },[])

    return <div>
        <div>{console.log(state)}</div>
        <Game game={state} playerId={playerId}/>
    </div>
}