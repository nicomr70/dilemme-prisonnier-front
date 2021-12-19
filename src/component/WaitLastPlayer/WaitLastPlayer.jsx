import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import {ADDRSERVEURGAME} from "../../App";
import {useNavigate, useParams} from "react-router-dom";

export default function WaitLastPlayer(){
    const navigate = useNavigate()
    const {gameId,playerId} = useParams()

    useEffect(()=>{
        const eventGame = new EventSource(ADDRSERVEURGAME+"/waitLastPlayer/gameId="+gameId)

        eventGame.onopen = ()=>console.log("connexion au server ouverte")

        eventGame.onmessage = (ev)=>{
            const game = JSON.parse(ev.data)
            navigate("/game/"+gameId+"/play/"+playerId)
        }

        return ()=>{
            eventGame.close()
        }
    },[])

    return <div>
        <div>
            <img src="https://i.gifer.com/2nd8.gif"/>
        </div>
        <p>En attente d'un second joueur</p>
    </div>
}