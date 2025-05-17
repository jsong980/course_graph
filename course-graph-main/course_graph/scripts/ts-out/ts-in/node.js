/** Node represents a node in a graph and stores its own position in the adjacency matrix for the graph */
export class Node {
    constructor(id) {
        this.key = `${id}`;
    }
    //getters and setters
    get nodeKey() {
        return this.key;
    }
}
