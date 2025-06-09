import { Course } from "../model/course.js";
import { Graph } from "../model/graph.js";
import { LogicOp, Clause } from "../model/clause.js";
import fs from 'fs';
export class JsonReader {
    constructor(source) {
        this.source = source;
    }
    read() {
        //TODO: 
        //Read the adj list from the file
        //Construct the graph using methods defined in Graph class
        //Return the new graph
        return this.parseGraph();
    }
    parseGraph() {
        //Get the adj list 
        //Construct the graph
        //Return the graph object 
        let obj = JSON.parse(fs.readFileSync(this.source, 'utf8'));
        let adjList = obj["adj_list"];
        let newGraph = new Graph();
        //Add all nodes to the graph
        for (let i = 0; i < adjList.length; i++) {
            let objNode = adjList[i][0];
            let target = this.parseNode(objNode);
            newGraph.addSingleNode(target);
        }
        //Add all edges
        for (let i = 0; i < adjList.length; i++) {
            for (let j = 1; j < adjList[i].length; j++) {
                let objNode = adjList[i][j];
                let pos = objNode["pos"];
                let target = newGraph.adjList[pos][0];
                let node = newGraph.adjList[i][0];
                newGraph.addPrequisite(target, node);
            }
        }
        return newGraph;
    }
    parseNode(objNode) {
        let node;
        if (objNode["type"] === "Course") {
            node = new Course(objNode["key"], objNode["credits"]);
        }
        else {
            let op;
            if (objNode["op"] === "Or") {
                op = LogicOp.OR;
            }
            else {
                op = LogicOp.AND;
            }
            node = new Clause(op, objNode["id"]);
        }
        return node;
    }
}
