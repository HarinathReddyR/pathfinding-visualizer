import NodeCell from './node';
import Node from '../interface/node_i'

const Grid = ({grid,handleMouseDown}:{grid:Node[][],handleMouseDown: (row: number, col: number) => void}) => {
    return(
        <>
            <div className='grid'
                style={{
                    display: 'grid',
                    gridTemplateRows: `repeat(${grid.length}, 30px)`,
                    gridTemplateColumns: `repeat(${grid[0].length}, 30px)`, 
                    // gap: '5px', // Space between boxes
                }}
            >
                {grid.map((row, rowIndex) => 
                    row.map((node) => (
                        <NodeCell key={`${node.row}-${node.col}`} node={node} handleMouseDown={() => handleMouseDown(node.row, node.col)}/>
                    ))
                )}
            </div>
        </>
    );
};

export default Grid
