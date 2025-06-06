/** Node represents a node in a graph and stores its own position in the adjacency list for the graph */
export class Node{ 
    private key : string; //key = string + "_" + id_num
    private pos : number; //-1 as default,

    
    constructor(id : string){
        this.key = `${id}`;
        this.pos = -1;
    }

    //getters and setters
    get nodeKey() : string{
        return this.key;
    } 

    get position() : number{
        return this.pos;
    }

    public setPosition(val : number) : void{
        this.pos = val;
    }
}