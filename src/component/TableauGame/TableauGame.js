import React, {useEffect, useState} from "react";
import {ADDRSERVEUR} from "../../App";
import ResumeGame from "../ResumeGame/ResumeGame";





export default function TableauGame({pseudo}){
    const [state,setState] = useState({load :true,games:[]})
    const load = true;

    useEffect(()=>{
        async function fetchInitialGames(state,setState){
                await fetch(ADDRSERVEUR+"/initialState",{method : 'GET'}).then (r=>{if(r.ok)return r.json()})
                    .then(r=>{setState({load: false, games: r})});
        }
        fetchInitialGames(state,setState);

        const eventSource = new EventSource(ADDRSERVEUR+"/allGames");
        eventSource.onopen = (e) =>console.log(e)

        eventSource.onmessage = (e)=>{
            setState({...state,games : JSON.parse(e.data)})
        }
        eventSource.onerror =()=>{
            eventSource.close()
        }

    },[load])



    return<div className="gameLine">
        {
            state.games.length === 0 ? <h3>Aucune Partie à l'horizon</h3> : state.games.filter((value)=>value.player1!=null && value.player2!=null).map((value,i)=>{return <ResumeGame pseudo={pseudo} key={value.id} game={value}></ResumeGame>})
        }
    </div>
}

