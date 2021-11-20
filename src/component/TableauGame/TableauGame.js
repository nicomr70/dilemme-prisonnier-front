import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ADDRSERVEUR} from "../../App";
import ResumeGame from "../ResumeGame/ResumeGame";





export default function TableauGame(){
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
            state.games.length === 0 ? <h3>Aucune Partie à l'horizon</h3> : state.games.map((value,i)=>{return <ResumeGame key={value.id} game={value}></ResumeGame>})
        }
    </div>
}

