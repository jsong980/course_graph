/** Node represents a node in a graph and stores its own position in the adjacency list for the graph */
export class Node{ 
    private key : string; //key = string + "_" + id_num
    private pos : number; //-1 as default,
    private type : string; //either Course or Clause
    
    constructor(id : string, type: string){
        this.key = `${id}`;
        this.pos = -1;
        this.type = type;
    }

    //getters and setters
    get nodeKey() : string{
        return this.key;
    } 

    get position() : number{
        return this.pos;
    }

    get typeOfNode() : string{
        return this.type;
    }

    public setPosition(val : number) : void{
        this.pos = val;
    }
}