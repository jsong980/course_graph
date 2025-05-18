/** Node represents a node in a graph and stores its own position in the adjacency list for the graph */
export class Node {
    constructor(id) {
        this.key = `${id}`;
        this.pos = -1;
    }
    //getters and setters
    get nodeKey() {
        return this.key;
    }
    get position() {
        return this.pos;
    }
    setPosition(val) {
        this.pos = val;
    }
}
