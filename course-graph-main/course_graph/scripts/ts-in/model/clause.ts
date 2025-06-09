
/**Clause represents a clause node representing a logic operator "AND" or "OR" */

import {Node} from "./node.js";

export enum LogicOp{
   AND = 'And', 
   OR = 'Or'
}

export class Clause extends Node{
    private op: LogicOp;
    private id: string;

    constructor(op: LogicOp, id: string){
        //Constructing a unique key
        super(id, "Clause");
        this.op = op;
        this.id = id;
    }
    
    get operator(){
        return this.op;
    }
}