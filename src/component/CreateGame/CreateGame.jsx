import React,{useRef} from "react";
import {ADDRSERVEUR} from "../../App";


export default function CreateGame(){
    const refNbTours = useRef()

    const handleClick =()=>{
        createGameServer(refNbTours.current.value).then((response)=>{
            
        });
    }

    return<div>
        <input type="number" ref={refNbTours} min={2} placeholder={2}/>
        <button onClick={handleClick}>Creer partie</button>
    </div>
}


async function createGameServer(value){
    return await fetch(ADDRSERVEUR+"/createGame/maxTurnCount="+value,{method:'POST'}).then((response)=>{
        if(response.ok){
            return response.json()
        }
    }).then((r)=>{
        console.log(r)
        return r
    })
}