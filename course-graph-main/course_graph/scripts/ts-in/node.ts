/** Node represents a node in a graph and stores its own position in the adjacency matrix for the graph */
export class Node{ 
    private key : string; //key = string + "_" + id_num

    
    constructor(id : string){
        this.key = `${id}`;
    }

    //getters and setters
    get nodeKey() : string{
        return this.key;
    }
}