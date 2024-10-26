import Node from '../interface/node_i';
import delay from '../common/delay.ts'

export const dfs = async (grid: Node[][], start: { row: number; col: number }, end: { row: number; col: number },setGrid:(grid:Node[][])=>void) => {
    const stack: { row: number; col: number }[] = [start];
    const parents: { [key: string]: { row: number; col: number } } = {};

    grid[start.row][start.col].isVisited=true;

    while (stack.length) {
        const current = stack.pop();
        if(!current) continue;//todo

        const {row,col}= current;
        if(!grid[row][col].isVisited){
            grid[row][col].isVisited=true;
            setGrid(grid.map(r => r.map(cell => ({ ...cell }))))
        }
        if(row==end.row && col == end.col){
            const path: { row: number; col: number }[] = [];
            let node: { row: number; col: number } = current;

            while (node) {
                path.unshift(node);
                node = parents[`${node.row},${node.col}`];
            }
            return path;
        }
        

        const neighbors :{row:number,col:number}[]=[
            {row:-1,col:0},
            {row:+1,col:0},
            {row:0,col:-1},
            {row:0,col:1},
        ];
        for (const neighbor of neighbors){
            const n_row:number = row + neighbor.row;
            const n_col:number = col + neighbor.col;
            if(n_row>=0 && n_row<grid.length
                && n_col>=0 && n_col<grid[0].length
                && !grid[n_row][n_col].isVisited
                && !grid[n_row][n_col].isWall
            ){
                // grid[n_row][n_col].isVisited=true;
                // setGrid([...grid]);
                await delay(10);
                stack.push({row:n_row,col:n_col});
                parents[`${n_row},${n_col}`] = current;
            }
        }
    }
    return []; 
};
