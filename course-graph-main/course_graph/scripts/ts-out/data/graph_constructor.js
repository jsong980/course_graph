/* v8 ignore start */
//This program constructs the entire course graph and saves it to graph_data.json
import { Course } from "../model/course.js";
import { Graph } from "../model/graph.js";
// import * as d3 from 'https://cdn.skypack.dev/d3@7';
// import fs from 'fs'
// import data from '../user.json' with {type: "json"};
import { JsonWriter } from "../persistence/JsonWriter.js";
/* v8 ignore stop */
const cpsc103 = new Course("CPSC_V 103", 4);
const cpsc107 = new Course("CPSC_V 107", 4);
const graph = new Graph();
const jsonWriter = new JsonWriter('../mimi.json');
graph.addPrequisite(cpsc107, cpsc103);
jsonWriter.saveGraph(graph);
console.log("yeyayeay");
