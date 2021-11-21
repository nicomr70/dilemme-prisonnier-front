import React from "react";


export function Game({game,playerId}){
    if(game.id !== undefined ) {
        const playerCurrent = game.player1.id === playerId ? game.player1 : game.player2
        const otherPlayer = game.player1.id === playerId ? game.player2 : game.player1
        const tourCourant = game.turnCount
        const lastChoiceOtherplayer = otherPlayer.choicesHistory.pop()

        return <div>
            <h1>Partie {game.id}</h1>
            <div>
                <p>Score</p>
                <p>{playerCurrent.name}: {playerCurrent.score}</p>
                <p>{otherPlayer.name}: {playerCurrent.score}</p>
            </div>
            {lastChoiceOtherplayer ? <p>otherPlayer.name à</p> : ""}
        </div>
    }else{
        return null
    }

}