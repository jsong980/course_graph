import {Node} from "./node.js"

export class Edge{
    private from : Node;
    private to : Node;

    constructor(start : Node, target: Node){
        this.from = start;
        this.to = target; 
    }

    //getters 
    get start() : Node{
        return this.from;
    }

    get target() : Node{
        return this.to;
    }
}
