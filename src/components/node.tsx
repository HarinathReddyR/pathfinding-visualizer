import Node from '../interface/node_i'
import './node.css';
const NodeCell = ({node,handleMouseDown}:{node:Node,handleMouseDown: () => void}) => {
    const type:string =(node.isPath)?'path':(node.isStart)?'start':(node.isEnd)?'end':(node.isWall)?'Wall':(node.isVisited)?'visited':'cell'
    return(
        <div className={`Node ${type}`} key={`${node.row}-${node.col}`} onMouseDown={handleMouseDown} 
          >
        </div>
    );
};
export default NodeCell;