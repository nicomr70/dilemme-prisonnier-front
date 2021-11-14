import React, {useRef} from 'react'

const allStrat=["c all","l all","reverse"]

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

    return <select ref={refSelect} onChange={handleChange}>
        {
            allStrat.map((value)=>{
                return <option value={value} key={value}>{value}</option>
            })
        }
    </select>
}