import {Node} from "../model/node.js"; 
import {Course} from "../model/course.js"; 
import {Graph} from "../model/graph.js";
import { LogicOp, Clause } from "../model/clause.js";
import fs, { write } from 'fs'

export class JsonWriter{
    private destination : string; //path to source file

    constructor(destination : string){
        this.destination = destination; 
    }

    private writeToOutput(jsonObj : string) : void{
        //TODO: Change to try catch block instead
        // fs.writeFile(this.destination, jsonObj, (err) => {
        // if (err) {
        //     console.log('Error writing file:', err);
        // } else {
        //     console.log('Successfully wrote file');
        // }});

        try{
            fs.writeFileSync(this.destination, jsonObj);
            console.log("Successfully wrote file!");
        }catch(err){
            console.log("Error writing to output file!");
        }
    }

    public saveGraph(graph : Graph) : void{
        let graph_json : string = JSON.stringify(graph, null, 2);
        this.writeToOutput(graph_json);
    }

    //Getters: 
    get dest() : string{
        return this.destination
    }
}