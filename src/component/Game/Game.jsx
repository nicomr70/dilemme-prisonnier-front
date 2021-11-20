import React from "react";


export function Game({game}){

    //afficher les information d'un jeu
    return <div>
        <p>{JSON.stringify(game)}</p>
    </div>

}