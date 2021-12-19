import React from "react";


export function Game({game,playerId}){
    if(game.id !== undefined ) {

        if(game.player1.id === playerId){
            const player = game.player1;
            const oppositePlayer = game.player2;
            const lastChoiceOpposite = game.player2.currentChoice;
            const tourCourant = game.turnCount
            const maxTour = game.maxTurnCount

            return <div>
                <h1>Partie {game.id}</h1>
                <h2>{tourCourant} sur {maxTour} tours</h2>
                <div>
                    <p>Score</p>
                    <p>{player.name}: {player.score}</p>
                    <p>{oppositePlayer.name}: {oppositePlayer.score}</p>
                </div>
                <div>
                    <p> {lastChoiceOpposite== "NONE" ? "" : oppositePlayer.name +" a joue "+lastChoiceOpposite}</p>
                </div>
            </div>

        }else{
            const player = game.player2;
            const oppositePlayer = game.player1;
            const lastChoiceOpposite = game.player1.currentChoice
            const tourCourant = game.turnCount
            const maxTour = game.maxTurnCount
            return <div>
                <h1>Partie {game.id}</h1>
                <h2>{tourCourant} sur {maxTour} tours</h2>
                <div>
                    <p>Score</p>
                    <p>{player.name}: {player.score}</p>
                    <p>{oppositePlayer.name}: {oppositePlayer.score}</p>
                </div>
                <div>
                    <p> {lastChoiceOpposite == "NONE" ? "" : oppositePlayer.name +" a joue "+lastChoiceOpposite}</p>
                </div>
            </div>
        }
    }else{
        return null
    }

}