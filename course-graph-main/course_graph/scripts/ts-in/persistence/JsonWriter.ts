import {Node} from "../model/node.js"; 
import {Course} from "../model/course.js"; 
import {Graph} from "../model/graph.js";
import { LogicOp, Clause } from "../model/clause.js";
import fs, { write } from 'fs'

export class JsonWriter{
    private destination : string; //path to source file
    private jsonObj = {nodes: [], edges: []};

    constructor(destination : string){
        this.destination = destination; 
    }

    private writeToOutput(jsonObj : string) : void{
        //TODO: Change to try catch block instead
        try{
            fs.writeFileSync(this.destination, jsonObj);
            console.log("Successfully wrote file!");
        }catch(err){
            console.log("Error writing to output file!");
        }
    }

    public saveGraph(graph : Graph) : void{
        this.saveNodesToJsonObj(graph); 
        this.saveEdgesToJsonObj(graph);
        let jsonString : string = JSON.stringify(this.jsonObj, null, 2);
        this.writeToOutput(jsonString);
    }

    public saveNodesToJsonObj(graph : Graph) : void{
        let nodes: Node[] = graph.courseList.concat(graph.clauseList);
        this.jsonObj.nodes = nodes as never[];
    }

    public saveEdgesToJsonObj(graph : Graph) : void{
        let edges : Object[] = []
        for(let i : number = 0; i < graph.adjList.length; i++){
            for(let j : number = 1; j < graph.adjList[i].length; j++){
                let src : Node = graph.adjList[i][0];
                let tar : Node = graph.adjList[i][j];
                edges.push({source: src, target: tar});
            }
        }
        
        this.jsonObj.edges = edges as never[];
    }

    //Getters: 
    get dest() : string{
        return this.destination
    }
}