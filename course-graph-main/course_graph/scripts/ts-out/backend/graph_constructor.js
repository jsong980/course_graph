/* v8 ignore start */
//This program constructs the entire course graph and saves it to user.json
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
const jsonWriter = new JsonWriter('../user.json');
graph.addPrequisite(cpsc107, cpsc103);
jsonWriter.saveGraph(graph);
console.log("yeyayeay");
// let graph_json : string = JSON.stringify(graph, null, 2);
// fs.writeFile('user.json', graph_json, (err) => {
//     if (err) {
//         console.log('Error writing file:', err);
//     } else {
//         console.log('Successfully wrote file');
//     }
// });
// const obj = JSON.parse(JSON.stringify(data));
// console.log(obj.adj_list);
// window.onload = function (){
//     const graph : Graph = obj as Graph; 
//     const svg = d3.select("svg");
//     const width = +svg.attr("width");
//     const height = +svg.attr("height");
//     console.log("Hellow ");
//     const node = svg.append("g")
//         .attr("class", "nodes")
//         .selectAll("g")
//         .data(graph.courseList)
//         .enter().append("g")
//     node.append("circle").attr("r", 10);
//     node.append("text")
//         .attr("dy", -15)
//         .attr("text-anchor", "middle")
//         .text(d => d.nodeKey);
// }
// function fetchJsonData() : void {
//     fetch('./user.json')
//     .then(response => response.json()) // Parse JSON
//     .then(data => console.log(data)) // Work with JSON data
//     .catch(error => console.error('Error fetching JSON:', error));
// }
