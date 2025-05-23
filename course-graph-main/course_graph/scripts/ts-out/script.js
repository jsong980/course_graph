/* v8 ignore start */
import { Course } from "./course.js";
import { Graph } from "./graph.js";
import fs from 'fs';
import data from './user.json';
/* v8 ignore stop */
const cpsc103 = new Course("CPSC_V 103", 4);
const cpsc107 = new Course("CPSC_V 107", 4);
const graph = new Graph();
graph.addPrequisite(cpsc107, cpsc103);
let graph_json = JSON.stringify(graph, null, 2);
fs.writeFile('user.json', graph_json, (err) => {
    if (err) {
        console.log('Error writing file:', err);
    }
    else {
        console.log('Successfully wrote file');
    }
});
const obj = JSON.parse(JSON.stringify(data));
console.log(obj);
