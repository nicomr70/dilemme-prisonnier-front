import React from 'react'

export default function ButtonJeu({id,onClick,nameButton,disabled}){
    const sendResponse = (e)=>{
        onClick(nameButton === "cooperate",id);
    }
    return<div>
        <button id={id} onClick={sendResponse} disabled={disabled}>{nameButton}</button>
    </div>
}