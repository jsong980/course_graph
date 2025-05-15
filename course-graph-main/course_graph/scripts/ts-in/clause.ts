
/**Clause represents a clause node representing a logic operator "AND" or "OR" */

import {Node} from "./node.js";

export enum LogicOp{
   AND = 'And', 
   OR = 'Or'
}

export class Clause extends Node{
    type: LogicOp;
    children: Node[] = [];

    constructor(type: LogicOp){
        super(JSON.parse(JSON.stringify(type)));
        this.type = type;
    }
}