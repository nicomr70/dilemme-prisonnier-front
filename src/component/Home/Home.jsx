import CreateGame from "../CreateGame/CreateGame";
import TableauGame from "../TableauGame/TableauGame";
import {useParams} from "react-router-dom";


export default function Home(){
    const {pseudo} =useParams()
    return<div>
        <div><h1>{pseudo}</h1></div>
        <div>
            <div>
                <div>
                    <h2>Creer une partie</h2>
                    <CreateGame></CreateGame>
                </div>
                <div>
                    <TableauGame pseudo={pseudo}></TableauGame>
                </div>
            </div>
        </div>
    </div>
}

