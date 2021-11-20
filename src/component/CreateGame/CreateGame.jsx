import React,{useRef} from "react";
import {ADDRSERVEUR} from "../../App";


export default function CreateGame(){
    const refNbTours = useRef()

    const handleClick = async ()=>{
        await createGameServer(refNbTours.current.value);
    }

    return<div>
        <input type="number" ref={refNbTours}  min={2} placeholder={2}/>
        <button onClick={handleClick}>Creer partie</button>
    </div>
}


async function createGameServer(value){
    console.log('fetch create game')
    return await fetch(ADDRSERVEUR+"/createGame/maxTurnCount="+value,{method:'PUT'}).then((response)=>{
        if(response.ok){
            return response.json()
        }
    }).then((r)=>{
        console.log(r);
        return r
    })
}