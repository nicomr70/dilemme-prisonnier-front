import React, {useEffect, useState} from "react";
import {ADDRSERVEUR} from "../../App";
import ResumeGame from "../ResumeGame/ResumeGame";





export default function TableauGame({pseudo}){
    const [state,setState] = useState({load :true,games:[]})
    const load = true;

    async function fetchInitialGames(state,setState){
        await fetch(ADDRSERVEUR+"/initialState",{method : 'GET'}).then (r=>{if(r.ok)return r.json()})
            .then(r=>{setState({load: false, games: r})});
    }


    useEffect(()=>{
        fetchInitialGames(state,setState);
        const eventSource = new EventSource(ADDRSERVEUR+"/allGames");

        eventSource.onmessage = (e)=>{
            console.log("recu")
            setState((state)=> {return {load : state.load ,games: JSON.parse(e.data)}})
        }
        eventSource.onerror =()=>{
            eventSource.close()
        }

        return ()=>{
            eventSource.close()
        }
    },[])



    return<div className="gameLine">
        {
            state.games.length === 0 ? <h3>Aucune Partie à l'horizon</h3> : state.games.map((value,i)=>{return <ResumeGame pseudo={pseudo} key={value.id} game={value}></ResumeGame>}).reverse()

        }
    </div>
}

