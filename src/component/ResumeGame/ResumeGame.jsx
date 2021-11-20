import React from "react";
import {ADDRSERVEURGAME} from "../../App";
import {useNavigate} from "react-router-dom";

export default function ResumeGame({game}){
    const navigate = useNavigate()
    console.log(game)
    const handleClick= async ()=>{
        await fetch(`${ADDRSERVEURGAME}/join/gameId=${game.id}/playerName=nicolas`,{method : 'PUT'}).then((response)=>{
            if(response.ok){
                return response.json()
            }
        }).then((re)=>{
            nbJoueurInGameFetch(game).then((r)=>{
                alert("vous venez de rejoindre la partie "+game.id)
                navigate(r===2 ? `/game/${game.id}/play/${re.id}` : `/game/waitLastPlayer/${game.id}`)
            })
        }).catch((ev)=>{
            alert("vous n'avez pas reussi a rejoindre la partie\n raison : "+ev)
        })
    }

    return <>
        <div className="gameLineItem">
            <div>
                <p>Id:<b>{game.id}</b></p>
            </div>
            <div>
                <p>nombre joueurs : <b>{nbJoueurInGame(game)}</b></p>
            </div>
            <div>
                {buttonOrNot(game,handleClick)}
            </div>
        </div>
    </>
}

function nbJoueurInGame(game){
    return (game.player1!==null)+(game.player2!==null);
}

async function nbJoueurInGameFetch(game){
    return await fetch(ADDRSERVEURGAME+"/initialState/gameId="+game.id).then(r =>{
        if (r.ok){
            return r.json();
        }
    }).then( game =>{
        return nbJoueurInGame(game)
    }).catch((e)=> {
        return 0;
    })
}

function buttonOrNot(game,onclick){
    if(nbJoueurInGame(game)!==2){
        return <button onClick={onclick}>Rejoindre la partie</button>
    }else{
        return <button onClick={onclick} disabled>Rejoindre la partie</button>
    }
}