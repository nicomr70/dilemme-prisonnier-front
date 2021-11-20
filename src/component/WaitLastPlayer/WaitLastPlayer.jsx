import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import {ADDRSERVEURGAME} from "../../App";
import {useNavigate, useParams} from "react-router-dom";

export default function WaitLastPlayer(){
    const navigate = useNavigate()
    const {gameId} = useParams()

    useEffect(()=>{
        const eventGame = new EventSource(ADDRSERVEURGAME+"/waitLastPlayer/gameId="+gameId)

        eventGame.onopen = ()=>console.log("connexion au server ouverte")

        eventGame.onmessage = (ev)=>{
            const game = JSON.parse(ev.data)
            navigate("/game/"+gameId+"/play/"+game.id)
        }

        return ()=>{
            eventGame.close()
        }
    },[])

    return <div>
        <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        <p>En attentes d'un second joueur</p>
    </div>
}