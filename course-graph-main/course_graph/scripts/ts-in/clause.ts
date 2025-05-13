
/**Clause represents a clause node representing a logic operator "AND" or "OR" */

import {Node} from "./node.js";

export enum LogicOp{
   AND, 
   OR 
}

export class Clause extends Node{
    type: LogicOp;
    children: Node[] = [];

    constructor(type: LogicOp){
        super();
        this.type = type;
    }
}