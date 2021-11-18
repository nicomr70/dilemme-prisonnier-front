import React, {useEffect, useState} from "react";
import {ADDRSERVEUR} from "../../App";
import ResumeGame from "../ResumeGame/ResumeGame";


export default function TableauGame(){
    const [state,setState] = useState([])

    useEffect(()=>{allGames().then(response=>setState(response))},[])
    return<div className="gameLine">
        {
            state.map((value,i)=>{return <ResumeGame key={value.id} game={value}></ResumeGame>})
        }
    </div>
}

async function allGames(){
    return await fetch(ADDRSERVEUR + "/allGames", {method: 'GET'}).then((response) => {
        if (response.ok) {
            return response.json()
        }
    }).then((response) => {
        console.log(response)
        return response
    })
};
