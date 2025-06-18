import {Node} from "../model/node.js"; 
import {Course} from "../model/course.js"; 
import {Graph} from "../model/graph.js";
import { LogicOp, Clause } from "../model/clause.js";
import fs, { write, promises } from 'fs' 

export class JsonReader{
    private source : string; //Path to output file

    constructor(source: string){
        this.source = source; 
    }

    public read() : Object {//Reads the source file, parses JSON and returns a Graph Object
        //TODO: 
        return this.parseGraph();
    }

    private parseGraph() : Object{
        let obj = JSON.parse(fs.readFileSync(this.source, 'utf8')); 
        return obj;
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