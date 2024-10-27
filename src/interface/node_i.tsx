interface Node{
    row:number,
    col:number,
    isStart:boolean,
    isEnd:boolean,
    isWall:boolean,
    isVisited:boolean,
    isPath:boolean,
    weight:number
}

export default Node;