/** Node represents a node in a graph and stores its own position in the adjacency matrix for the graph */
export class Node{ 
    private static numOfNodes: number = 0; 
    private id_num : number;
    private key : string; //key = string + "_" + id_num

    
    constructor(id : string){
        Node.numOfNodes++;
        this.id_num = Node.numOfNodes;
        this.key = `${id}_${this.id_num}`;
    }

    //for testing 
    print_key():void{
        console.log(this.id_num);
    }

    //getters and setters:
    get nodeId() : number{
        return this.id_num;
    }

    get nodeKey() : string{
        return this.key;
    }
}