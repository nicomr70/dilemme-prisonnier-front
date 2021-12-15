import {Game} from "../Game/Game";
import Strategy from "../Strategy/Strategy";
import React, {useCallback, useEffect, useState} from "react";
import {ADDRSERVEURGAME} from "../../App";
import {useParams} from "react-router-dom";
import Loader from "react-loader-spinner";


export default function Play(){
    const {gameId,playerId} = useParams()
    let [state,setState] = useState({enAttente : false, player :{}, game:{}});


    async function loadData(){
        await Promise.all([loadGame(gameId),loadPlayer(gameId,playerId)])
            .then((values)=>{
                setState({enAttente: false,player:values[1], game :values[0]})
            })
            .catch((e)=>console.log(e))
    }

    useEffect(()=>{
        loadData();
        const eventGame = new EventSource(ADDRSERVEURGAME+"/waitPlayerPlay/gameId="+gameId)
        eventGame.onopen = ()=>console.log("connexion au server ouverte")
        eventGame.onmessage = async (g)=>{
            await loadData(gameId,playerId);
            await loadPlayer(gameId,playerId)
        }
        eventGame.onerror = (e)=>{
            alert("une erreur c'est produite avec le serveur \n raison : "+JSON.stringify(e));
            eventGame.close()
        }
        return ()=>{
            eventGame.close()
        }
    },[]);

    async function handleClickDefect(){
        setState({...state,enAttente : true})
        console.log(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+state.player.id+"/move=COOPERATE");
        console.log(state)
        await fetch(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+state.player.id+"/move=DEFECT",{method:'PUT'})
    }

    async function handleClickCooperate(){
        setState({...state, enAttente : true})
        console.log(state)
        await fetch(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+state.player.id+"/move=COOPERATE",{method:'PUT'})
    }

    async function setStrategy(value){
        //TODO voir quoi envoyer pour etre sur de retrouver les strategy coter serveur
        await fetch(ADDRSERVEURGAME+"/gameId="+state.game.id+"/playerId="+state.player.id+"/strategy="+value,{method : 'PUT'}).then(
            r => {
                if(r.ok){
                    alert("vous venez de placer votre strategy vous ne pouver donc plus jouer");
                    //envoyer sur autre page faite pour !!
                }
            }
        )
    }

    const cooperate = useCallback(handleClickCooperate,[state])
    const defect = useCallback(handleClickDefect,[state])
    const setStrategyCallback = useCallback(setStrategy,[state])

    return<div>
       <div hidden={state.enAttente}>
           <Game game={state.game}  playerId={state.player.id}></Game>
           <button onClick={cooperate}>
               <div>
                   <img className="button_Gif" alt="defect.gif" src="https://tenor.com/view/homer-simpson-gif-3448525.gif"/>
                   <p>Trahir</p>
               </div>
           </button>
           <button onClick={defect}>
               <div>
                   <img className="button_Gif" alt="defect.gif" src="https://tenor.com/view/the-simpsons-simpson-barny-gumble-bar-moe-sizlak-gif-3846347.gif"/>
                   <p>Cooppérer</p>
               </div>
           </button>
       </div>
        <div hidden={state.enAttente}>
            <Strategy setStrategy={setStrategyCallback}></Strategy>
        </div>
        <div hidden={!state.enAttente}>
            <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        </div>

    </div>
}

async function loadGame(gameId){
    return await fetch(ADDRSERVEURGAME + "/initialState/gameId=" + gameId, {method: 'GET'})
        .then(r => {if (r.ok) return r.json()})
        .then(r => {return r})
        .catch(e =>console.log(e))
}

async function loadPlayer(gameId,playerId){
    return await fetch(ADDRSERVEURGAME + "/" + gameId + "/player/" + playerId, {method: 'GET'})
        .then((r) => {if (r.ok) return r.json()})
        .then((r) => {return r})
        .catch((e) => {console.log(e)})
}