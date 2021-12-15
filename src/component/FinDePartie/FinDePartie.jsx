import {useNavigate} from "react-router-dom";


export default function FinDePartie(){
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate("/home");
    }
    return<div>
        <p>Vous avez fini votre partie</p>
        <button onClick={handleClick}>retourner au menu</button>
    </div>
}