import {useNavigate, useParams} from "react-router-dom";


export function PageNotFound(){
    const navigate = useNavigate();
    const handleClick = ()=>{
            navigate("/")
    }

    return <div className="page404">
        <div >
            <img src="https://i2.wp.com/tomrogerswebdesign.com/wp-content/uploads/2016/02/doh-homer-computer500x295.jpg?ssl=1"/>
        </div>
        <div>
            <p>D'hoo cette page n'exite pas , retourne à l'accueil</p>
            <button onClick={handleClick}>retour au menu</button>
        </div>
    </div>
}