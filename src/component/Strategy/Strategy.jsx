import React, {useEffect, useRef, useState} from 'react'
import {ADDRSERVEUR,ADDRSERVEURGAME} from "../../App";


export default function Strategy(){
    const selectRef = useRef();

    const handleClick = ()=>{
        console.log(selectRef.current.value)
        //TODO ici on fait le fetch post pour envoyer un changement de strat et mettre tous le rest en attente
    }
    return <div>
        <SelectWithOption refSelect={selectRef}></SelectWithOption>
        <button onClick={handleClick}>Play with this Strategy</button>
    </div>

}

function SelectWithOption({refSelect,handleChange}){
    const [Strats,setStrategy]=useState([])
    useEffect(async()=>{
        await fetch(ADDRSERVEURGAME+"/allStrategy",{method:'GET'}).then((response)=>{
            if(response.ok){
                console.log(response)
                return response.json()
            }
        }).then(
            (response)=>
                setStrategy(response)
        )
    },[])

    return <select ref={refSelect} onChange={handleChange}>
        {
            Strats.map((value)=>{
                return <option value={value} key={value}>{value}</option>
            })
        }
    </select>
}