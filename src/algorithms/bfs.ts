import Node from '../interface/node_i';
import delay from '../common/delay.ts'

export const bfs = async (grid: Node[][], start: { row: number; col: number }, end: { row: number; col: number },setGrid:(grid:Node[][])=>void) => {
    const queue: { row: number; col: number }[] = [start];
    const parents: { [key: string]: { row: number; col: number } } = {};

    grid[start.row][start.col].isVisited=true;

    while (queue.length) {
        const current = queue.shift();
        if (!current) continue;
        const { row, col } = current; 
        
        if (row === end.row && col === end.col) {
            // Path found
            const path: { row: number; col: number }[] = [];
            let node: { row: number; col: number } = current;

            while (node) {
                path.unshift(node);
                node = parents[`${node.row},${node.col}`];
            }
            return path;
        }

        const neighbors: { row: number; col: number }[] = [
            { row: row - 1, col }, 
            { row: row + 1, col }, 
            { row, col: col - 1 }, 
            { row, col: col + 1 }, 
        ];

        for (const neighbor of neighbors) {
            const { row: nRow, col: nCol } = neighbor;
            if (
                nRow >= 0 && nRow < grid.length &&
                nCol >= 0 && nCol < grid[0].length &&
                !grid[nRow][nCol].isWall &&
                !grid[nRow][nCol].isVisited
            ) { 
                grid[nRow][nCol].isVisited=true;
                setGrid([...grid]);
                await delay(10);
                queue.push(neighbor);
                parents[`${nRow},${nCol}`] = current; //for path
            }
        }
    }
    return []; 
};
