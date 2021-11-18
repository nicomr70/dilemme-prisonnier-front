import React,{useEffect, useState} from "react";
import {ADDRSERVEUR, ADDRSERVEURGAME} from "../../App";
import ResumeGame from "../ResumeGame/ResumeGame";
import ButtonJeu from "../buttonJeu/ButtonJeu";


export function Game(){
    const [state,setState]= useState({b1 :false,b2:false,id:1,player:{id:1},jeu : {}})
    //TODO fetch etat inital
    useEffect(()=>{
        const eventSource = new EventSource(ADDRSERVEURGAME+"/stream-test/id="+1)

        eventSource.onopen=(e) => {console.log("stream between client and server")}

        eventSource.onmessage=(e) =>{
            console.log(e.data)
            setState({
                ...state,
                b1: false,
                b2:false,
                jeu: e.data
            })
        }

        eventSource.onerror=(e) =>{console.log("problem with server")}
    },[]);


    const handleClick= async (Choice)=>{
        setState({...state,
            b1 : true,
            b2: true
        })
        //TODO remplacer dans le fetch move par chooice
        await fetch(ADDRSERVEURGAME+"/play/gameId="+state.id+"/playerId="+state.player.id+"/move=DEFECT",{method : 'POST'})

    }

    return <>
        <div>{JSON.stringify(state.jeu)}</div>
        <ButtonJeu onClick={handleClick} nameButton="cooperate" disabled={state.b1}></ButtonJeu>
        <ButtonJeu onClick={handleClick} nameButton="livery" disabled={state.b1}></ButtonJeu>
    </>

}