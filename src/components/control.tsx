import { useState } from "react";
import './control.css'

const Algorithm=({algorithm,setAlgorithm }:{algorithm:string,setAlgorithm: (algorithm:string) => void})=>{
    
    return(
        <select 
        value={algorithm} 
        onChange={(e) => setAlgorithm(e.target.value)}
        className="algorithm-dropdown"
        >
            <option value="dfs">Depth First Search (DFS)</option>
            <option value="bfs">Breadth First Search (BFS)</option>
            <option value="aStar">A* Search</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
        </select>
    );
}
const Control = ({ algorithm, setAlgorithm,onStart,clearBoard}:{algorithm:string,setAlgorithm :(algorithm:string) => void,onStart: () => void,clearBoard:()=>void}) => {
    return(
        <div className="control">
            <Algorithm algorithm={algorithm} setAlgorithm={setAlgorithm}/>
            <button onClick={onStart} className="control-button">Start</button>
            <button onClick={clearBoard} className="control-button">Clear Board</button>
        </div>
    );
}

export default Control;