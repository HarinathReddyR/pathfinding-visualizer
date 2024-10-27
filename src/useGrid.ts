import { useState } from 'react';
import Node from './interface/node_i'

const ROWS = 18;
const COLS = 30;

const initialNodes = Array.from({ length: ROWS }, (_, i) =>
    Array.from({ length: COLS }, (_, j) => ({
      row:i,
      col:j,
      isStart:(i==2 && j==3)?true:false,
      isEnd:(i==15 && j==20)?true:false,
      isVisited:false,
      isWall:(i==3&& j==8)?true:false,
      isPath:false,
      weight:1
    }))
  );


export const useGrid = () => {
  const [grid, setGrid] =  useState<Node[][]>(initialNodes); 
  const [startNode, setStartNode] = useState<{row:number,col:number}>({
    row:2,
    col:3,
    });
    // isStart:true,
    // isEnd:false,
    // isWall:false,
    // isVisited:false,
    // isPath:false
  const [endNode, setEndNode] = useState<{row:number,col:number}>({
    row:15,
    col:20,
    // isStart:false,
    // isEnd:true,
    // isWall:false,
    // isVisited:false,
    // isPath:false
    });

  const handleMouseDown = (row: number, col: number) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell })));
      console.log("hi");
      if (!startNode) {
        newGrid[row][col].isStart = true;
        setStartNode({ row, col });
      } else if (!endNode) {
        newGrid[row][col].isEnd = true;
        setEndNode({ row, col });
      } 
      // else {
      //   newGrid[row][col].isWall = !newGrid[row][col].isWall; 
      // }
      if (! newGrid[row][col].isStart && ! newGrid[row][col].isEnd) {
        newGrid[row][col].weight = ( newGrid[row][col].weight === Infinity) ? 1 : ( newGrid[row][col].weight + 1) % 10; // Simple weight cycling
      }
      return newGrid;
    });
    console.log("hi");
  };

  return { grid, setGrid, handleMouseDown, startNode, endNode };
};
