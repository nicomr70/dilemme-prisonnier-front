import {Game} from "../Game/Game";
import Strategy from "../Strategy/Strategy";
import React, {useCallback, useEffect, useState} from "react";
import {ADDRSERVEURGAME} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "react-loader-spinner";


export default function Play(){
    const {gameId,playerId} = useParams()
    const [state,setState] = useState({oppositePlayerSetStrategy : false,enAttente : false, player :{}, game:{}});
    const navigate = useNavigate();


    async function loadData(){
        await Promise.all([loadGame(gameId),loadPlayer(gameId,playerId)])
            .then((values)=>{
                if(values[0]?.turnCount === values[0]?.maxTurnCount){
                    navigate("/game/"+gameId+"/end/"+values[1].name)
                }
                setState({oppositePlayerSetStrategy : false,enAttente: false,player:values[1], game :values[0]})
            })
            .catch((e)=>{
                navigate("/pagenotfound/");
            })
    }

    useEffect(()=>{
        loadData();
        const eventGame = new EventSource(ADDRSERVEURGAME+"/waitPlayerPlay/gameId="+gameId)
        eventGame.onopen = ()=>console.log("connexion au server ouverte")

        eventGame.onmessage = (g)=>{
            console.log("ici tu recois un message")
            setState((state) =>{
                const game = JSON.parse(g.data);
                const player = state.player.id === game.player1.id ? game.player1 : game.player2
                if(game?.turnCount == game?.maxTurnCount){
                        navigate("/game/"+gameId+"/end/"+player.name);

                }
                return {oppositePlayerSetStrategy: false,game:game,player: player,enAttente: false}
            });
        }
        eventGame.onerror = (e)=>{
            alert("une erreur c'est produite avec le serveur \n raison : "+JSON.stringify(e));
            eventGame.close()
            navigate("/pagenotfound")
        }
        return ()=>{
            eventGame.close()
        }
    },[]);

    async function handleClickDefect(){
        setState({...state,enAttente : true})
        console.log(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+state.player.id+"/move=COOPERATE",{method: 'PUT'});
        console.log(state)
        await fetch(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+state.player.id+"/move=DEFECT",{method:'PUT'})
    }

    async function handleClickCooperate(){
        setState({...state, enAttente : true})
        console.log(state)
        await fetch(ADDRSERVEURGAME+"/play/gameId="+state.game.id+"/playerId="+state.player.id+"/move=COOPERATE",{method:'PUT'}).catch(err=>console.log(err))
    }

    async function setStrategy(value){
        //TODO voir quoi envoyer pour etre sur de retrouver les strategy coter serveur
        await fetch(ADDRSERVEURGAME+"/"+state.game.id+"/"+state.player.id+"/"+value,{method : 'PUT'}).then(
            r => {
                if(r.ok){
                    alert("vous venez de placer votre strategy vous ne pouver donc plus jouer");
                    navigate("/game/"+gameId+"/"+playerId+"/viewGame");
                }
            }
        )
    }

    const cooperate = useCallback(handleClickCooperate,[state])
    const defect = useCallback(handleClickDefect,[state])
    const setStrategyCallback = useCallback(setStrategy,[state])
    return<div>
        {console.log(state)}
       <div hidden={state.enAttente}>
           <Game game={state.game}  playerId={state.player.id}></Game>
           <button onClick={defect}>
               <div>
                   <img className="button_Gif" alt="defect.gif" src="https://tenor.com/view/homer-simpson-gif-3448525.gif"/>
                   <p>Trahir</p>
               </div>
           </button>
           <button onClick={cooperate}>
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
            <div>
                <div>
                    <img src="https://i.gifer.com/2nd8.gif"/>
                </div>
                <p>En attente du coup du second joueurs</p>
            </div>
        </div>
        <div>
            <p></p>
        </div>
    </div>
}

export async function loadGame(gameId){
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