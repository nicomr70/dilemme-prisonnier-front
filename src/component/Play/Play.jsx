import {Game} from "../Game/Game";
import Strategy from "../Strategy/Strategy";
import React, {useCallback, useEffect,useState} from "react";
import {ADDRSERVEURGAME} from "../../App";
import {useParams} from "react-router-dom";
import Loader from "react-loader-spinner";


export default function Play(){
    const {gameId,playerId} = useParams()
    const [state,setState] = useState({load:true, enAttente : false,player :{}, game:{}});

    const playFetch = useCallback((choice)=>{
        setState({...state, enAttente : true})
        return fetch(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+state.player.id+"/move="+choice,{method:'PUT'})
            .then((r)=>console.log(r))
            .catch((e)=>{
                alert("votre coup n'a pas pu être pris en compte\n raison :"+e.data);
                setState({...state,enAttente : false})
            })
        },[]);


    useEffect(async ()=>{
        const load = () => {
            return Promise.all([loadGame(gameId),loadPlayer(gameId,playerId)])
                .then((values)=>{
                    console.log(values[0])
                    console.log(values[1])
                    setState({...state,enAttente: false,player: values[1], game : values[0]})
                })
                .catch((e)=>console.log(e))
        }
        load();

        const eventGame = new EventSource(ADDRSERVEURGAME+"/waitPlayerPlay/gameId="+gameId)

        eventGame.onopen = ()=>console.log("connexion au server ouverte")

        eventGame.onmessage = (g)=>{
            setState({...state, enAttente: false, game : g.data})
        }

        eventGame.onerror = (e)=>{
            alert("une erreur c'est produite avec le serveur \n raison : "+JSON.stringify(e));
            eventGame.close()
        }

    },[state.load])

    const handleClickDefect = async ()=>{
        await playFetch("DEFECT")
        console.log(state);
    }
    const handleClickCooperate = async ()=>{
        await playFetch("COOPERATE")
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


