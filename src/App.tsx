import { useState } from 'react'
import './App.css'
import Grid from './components/grid'
import Control from './components/control'
import { useGrid } from './useGrid'
import { bfs } from './algorithms/bfs'
import { dfs } from './algorithms/dfs'
import delay from './common/delay.ts'


function App() {
  const { grid, setGrid, handleMouseDown, startNode, endNode } = useGrid();
  const [isRunning,setisRunning]=useState(false);
  const [algorithm, setAlgorithm] = useState("dfs");
  const runAlgorithm = async () => {
    if(!isRunning){
    setisRunning(true);
    if (startNode && endNode) {
      let path:{row:number,col:number}[] =[];
      if(algorithm=='dfs'){ 
        path=await dfs(grid, startNode, endNode,setGrid);
      }else if(algorithm=='bfs'){
        path = await bfs(grid, startNode, endNode, setGrid);
      }
      for (const node of path) {
        grid[node.row][node.col].isPath = true; 
        setGrid(grid.map(r => r.map(cell => ({ ...cell }))))
        await delay(100);
      }
    }
    setisRunning(false);
  }
  };

  const clearBoard = () => {
    if(!isRunning){
    setGrid(prevGrid => {
      return prevGrid.map(row => 
          row.map(cell => ({
              ...cell,
              isWall: false,
              isVisited:false, 
              isPath: false, 
              isStart: cell.isStart, 
              isEnd: cell.isEnd 
          }))
      );
  });
  }
  };
  return (
    <>
      <div>
        <h1>Pathfinding Visualizer</h1>
        <Control algorithm={algorithm} onStart={runAlgorithm}
                    setAlgorithm={setAlgorithm} clearBoard={clearBoard}/>
        <Grid grid={grid} handleMouseDown={handleMouseDown} />
      </div>
      
    </>
  )
}

export default App
