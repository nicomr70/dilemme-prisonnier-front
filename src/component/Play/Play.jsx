import {Game} from "../Game/Game";
import Strategy from "../Strategy/Strategy";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {ADDRSERVEURGAME} from "../../App";
import {useParams} from "react-router-dom";
import Loader from "react-loader-spinner";


export default function Play(){
    const {gameId,playerId} = useParams()
    const [state,setState] = useState({load:true, enAttente : false,player :{},game:{}});
    const load = true
    const play = useCallback(async function playFetch(choice){
        await fetch(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+playerId+"/move="+choice,{method:'PUT'})
            .then((r)=>{
                if(r.ok) {
                    return r.json()
                }
            }).then((r)=>{
                setState({
                    ...state,
                    game: r,
                    enAttente : true
                })
            }).catch((e)=>{
                alert("votre coup n'a pas pu être pris en compte");
            })
    })

    useEffect(async ()=>{
        await fetch(ADDRSERVEURGAME+"/initialState/gameId="+gameId,{method:'GET'})
            .then(r=>{if(r.ok)return r.json()})
            .then(r=>{
                console.log(r);
                setState({...state,load :false,game : r })
            })

        //TODO faire le fetch pour recuperer le jeu
        const eventGame = new EventSource(ADDRSERVEURGAME+"/waitPlayerPlay/gameId="+gameId)

        eventGame.onopen = ()=>console.log("connexion au server ouverte")

        eventGame.onmessage = (g)=>{
            console.log(g)
            setState({...state,
                enAttente: false,
                game : g.data
            })
        }

        eventGame.onerror = (e)=>{
            alert("une erreur c'est produite avec le serveur \n raison : "+JSON.stringify(e));
            eventGame.close()
        }

    },[load])



    const handleClickDefect = async ()=>{
        await play("DEFECT").then(()=>console.log("envoie du coup DEFECT reussi" ));
    }
    const handleClickCooperate = async ()=>{
        await play("COOPERATE")
    }



    return<div>
       <div hidden={state.enAttente}>
           <Game game={state.game}></Game>
           <button onClick={handleClickDefect}>
               <div>
                   <img className="button_Gif" alt="defect.gif" src="https://tenor.com/view/homer-simpson-gif-3448525.gif"/>
                   <p>Trahir</p>
               </div>
           </button>
           <button onClick={handleClickCooperate}>
               <div>
                   <img className="button_Gif" alt="defect.gif" src="https://tenor.com/view/the-simpsons-simpson-barny-gumble-bar-moe-sizlak-gif-3846347.gif"/>
                   <p>Cooppérer</p>
               </div>
           </button>
       </div>
        <div hidden={state.enAttente}>
            <Strategy></Strategy>
        </div>
        <div hidden={!state.enAttente}>
            <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        </div>

    </div>
}
