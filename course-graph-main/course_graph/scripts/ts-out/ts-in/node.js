/** Node represents a node in a graph and stores its own position in the adjacency matrix for the graph */
export class Node {
    constructor() {
        this.position = -1; //-1 as default since haven't added to a graph yet
    }
    set_position(i) {
        this.position = i;
    }
    //for testing 
    print_position() {
        console.log(this.position);
    }
}
