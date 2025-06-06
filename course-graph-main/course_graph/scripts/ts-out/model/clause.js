/**Clause represents a clause node representing a logic operator "AND" or "OR" */
import { Node } from "./node.js";
export var LogicOp;
(function (LogicOp) {
    LogicOp["AND"] = "And";
    LogicOp["OR"] = "Or";
})(LogicOp || (LogicOp = {}));
export class Clause extends Node {
    constructor(op, id) {
        //Constructing a unique key
        super(id);
        this.op = op;
        this.id = id;
    }
    get operator() {
        return this.op;
    }
}
