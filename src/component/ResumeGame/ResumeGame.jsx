import React, {useEffect} from "react";
import {ADDRSERVEUR, ADDRSERVEURGAME} from "../../App";

export default function ResumeGame({game}){
    const handleClick= (e)=>{
        console.log(e)
    }
    useEffect(()=>{
        const eventSource = new EventSource(ADDRSERVEURGAME+"/stream-test/id=1")
        console.log(eventSource)
        eventSource.onopen = (event) => {
            console.log("connection opened")
        }

        eventSource.onmessage = (event) => {
            console.log("result", event.data);
        }

        eventSource.onerror = (event) => {
            console.log(event.target.readyState)
            if (event.target.readyState === EventSource.CLOSED) {
                console.log('eventsource closed (' + event.target.readyState + ')')
            }
            eventSource.close();
        }

        return () => {
            eventSource.close();
            console.log("eventsource closed")
        }

    },[])


    return <>
    </>
}


function nbJoueurinGame(game) {
    return (game.player1!==null)+(game.player2!==null);
}

function buttonOrNot(game,{onclick}){
    if(nbJoueurinGame(game)!==2){
        return <button onClick={onclick}>Rejoindre la partie</button>
    }else{
        return null
    }
}

/*
* <div className="gameLineItem">
            <div>
                <p>Id:<b>{game.id}</b></p>
            </div>
            <div>
                <p>nombre joueurs : <b>{nbJoueurinGame(game)}</b></p>
            </div>
            <div>
                {buttonOrNot(game,handleClick)}
            </div>
        </div>
* */