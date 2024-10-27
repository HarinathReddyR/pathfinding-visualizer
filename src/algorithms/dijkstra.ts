import Node from '../interface/node_i';
import delay from '../common/delay.ts'

export const dijkstra = async (grid: Node[][], start: { row: number; col: number }, end: { row: number; col: number },setGrid:(grid:Node[][])=>void) => {
    const distances: { [key: string]: number } = {};
    const parents: { [key: string]: { row: number; col: number } | null } = {};
    const queue: { row: number; col: number }[] = [];
    // console.log("hi");
    for(let row=0;row<grid.length;row++){
        for(let col=0;col<grid[0].length;col++  ){
            distances[`${row},${col}`]=Infinity;
            parents[`${row},${col}`]=null;
        }
    }
    queue.push(start);
    distances[`${start.row},${start.col}`]=0;
    // for(let i=0;i<grid.length*grid[0].length;i++){
    while (queue.length!=0) {
        // let min = -Infinity;// row=0,col=0;

        // for (let r = 0; r < grid.length; r++){
        //     for (let c = 0; c < grid[0].length; c++){
        //         if (grid[r][c].isVisited== false && distances[`${r},${c}`] <= min){
        //             min = distances[`${r},${c}`], row = r,col=c;
        //         }
        //     }
        // }
        queue.sort((a, b) => distances[`${a.row},${a.col}`] - distances[`${b.row},${b.col}`]);
        const current = queue.shift();
        if (!current) {console.log("current null");continue;}
        // let current={row:row,col:col};
        let {row,col}=current
        console.log("after curr");
        grid[row][col].isVisited = true;
        setGrid([...grid]); 
        await delay(10);
        if (row === end.row && col === end.col) {
            // Path found
            const path: { row: number; col: number }[] = [];
            let node: { row: number; col: number } = current;

            while (node) {
                path.unshift(node);
                let temp = parents[`${node.row},${node.col}`];
                if(!temp) {
                    console.log("node became null after finding end node")
                    continue;
                }
                node = temp;
                if(node==start) break;
            }
            console.log(path);
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
                !grid[nRow][nCol].isVisited &&
                distances[`${row},${col}`] + grid[nRow][nCol].weight < distances[`${nRow},${nCol}`]
            ) {
                
                    distances[`${nRow},${nCol}`] = distances[`${row},${col}`] + grid[nRow][nCol].weight;
                    parents[`${nRow},${nCol}`] = current;
                    queue.push(neighbor);
                
            }
        }
    }
    console.log("out");
    return [];
}