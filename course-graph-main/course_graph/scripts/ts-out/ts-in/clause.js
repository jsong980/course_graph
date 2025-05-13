/**Clause represents a clause node representing a logic operator "AND" or "OR" */
import { Node } from "./node.js";
export var LogicOp;
(function (LogicOp) {
    LogicOp[LogicOp["AND"] = 0] = "AND";
    LogicOp[LogicOp["OR"] = 1] = "OR";
})(LogicOp || (LogicOp = {}));
export class Clause extends Node {
    constructor(type) {
        super();
        this.children = [];
        this.type = type;
    }
}
