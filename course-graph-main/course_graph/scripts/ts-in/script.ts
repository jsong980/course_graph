/* v8 ignore start */

import * as d3 from "d3";
import {Node} from "./node.js"; 
import {Course} from "./course.js"; 
import {Graph} from "./graph.js";
import { LogicOp, Clause } from "./clause.js";
import fs from 'fs'
import data from './user.json';


/* v8 ignore stop */
const cpsc103 : Node = new Course("CPSC_V 103", 4); 
const cpsc107 : Node = new Course("CPSC_V 107", 4); 
const graph : Graph = new Graph(); 

graph.addPrequisite(cpsc107, cpsc103); 

let graph_json : string = JSON.stringify(graph, null, 2);

fs.writeFile('user.json', graph_json, (err) => {
    if (err) {
        console.log('Error writing file:', err);
    } else {
        console.log('Successfully wrote file');
    }
});

const obj = JSON.parse(JSON.stringify(data));
console.log(obj);


