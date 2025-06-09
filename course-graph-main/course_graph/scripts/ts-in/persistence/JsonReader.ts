import {Node} from "../model/node.js"; 
import {Course} from "../model/course.js"; 
import {Graph} from "../model/graph.js";
import { LogicOp, Clause } from "../model/clause.js";
import fs, { write, promises } from 'fs' 
import { parse } from "path";

export class JsonReader{
    private source : string; //Path to output file

    constructor(source: string){
        this.source = source; 
    }

    public read() : Graph {//Reads the source file, parses JSON and returns a Graph Object
        //TODO: 
        //Read the adj list from the file
        //Construct the graph using methods defined in Graph class
        //Return the new graph
        return this.parseGraph();
    }

    private parseGraph() : Graph{
        //Get the adj list 
        //Construct the graph
        //Return the graph object 
        let obj = JSON.parse(fs.readFileSync(this.source, 'utf8')); 
        let adjList = obj["adj_list"];
        let newGraph : Graph = new Graph();

        //Add all nodes to the graph
        for(let i : number = 0; i < adjList.length; i++){
            let objNode : any = adjList[i][0];
            let target : Node = this.parseNode(objNode);
            newGraph.addSingleNode(target);
        }

        //Add all edges
        for(let i : number = 0; i < adjList.length; i++){
            for(let j : number = 1; j < adjList[i].length; j++){
                let objNode : any = adjList[i][j];
                let pos : number = objNode["pos"];
                let target : Node = newGraph.adjList[pos][0];
                let node : Node = newGraph.adjList[i][0];
                newGraph.addPrequisite(target, node);
            }
        }

        return newGraph;
    }

    private parseNode(objNode : any) : Node{
        let node : Node;

        if(objNode["type"] === "Course"){
            node = new Course(objNode["key"], objNode["credits"]);
        }else{
            let op : LogicOp;
            if(objNode["op"] === "Or"){
                op = LogicOp.OR;
            }else{
                op = LogicOp.AND;
            }
            node = new Clause(op, objNode["id"]);
        }

        return node;
    }
}