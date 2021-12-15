import React, {useEffect, useRef, useState} from 'react'
import {ADDRSERVEURGAME} from "../../App";
import {useNavigate} from "react-router-dom";


export default function Strategy({setStrategy}){
    const selectRef = useRef();
    const handleClick = async ()=>{
        setStrategy(selectRef.current.value)

    }

    return <div>
        <SelectWithOption refSelect={selectRef}></SelectWithOption>
        <button onClick={handleClick}>Play with this Strategy</button>
    </div>

}

function SelectWithOption({refSelect,handleChange}){
    const [Strats,setStrategy]=useState([])
    useEffect(async ()=>{
        await fetch(ADDRSERVEURGAME+"/allStrategies",{method:'GET'}).then((response)=>{
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