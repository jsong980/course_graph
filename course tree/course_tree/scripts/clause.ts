
/**Clause represents a clause node with type having a value of either "AND" and "OR" */

import Node from "./Node.js";

class Clause implements Node{
    type: string;
    children: Node[] = [];

    constructor(type: string){
        this.type = type;
    }
}

export default Clause;