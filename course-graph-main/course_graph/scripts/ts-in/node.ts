/** Node represents a node in a graph and stores its own position in the adjacency matrix for the graph */
export class Node{ 
    private position: number; 
    
    constructor(){
        this.position = -1;//-1 as default since haven't added to a graph yet
    }

    

    //for testing 
    print_position():void{
        console.log(this.position);
    }

    //getters and setters:
    get getPosition() : number{
        return this.position;
    }

    set_position(i:number) : void{
        this.position = i;
    }
}