import {Node} from "./model/node.js"; 
import {Course} from "./model/course.js"; 
import {Graph} from "./model/graph.js";
import { LogicOp, Clause } from "./model/clause.js";
import * as d3 from 'd3';
import data from './graph_data.json' with {type: "json"}

console.log("hewwo");
const x : number = 100;
const y : number = 100;
const obj = JSON.parse(JSON.stringify(data));
const graph : Graph = Object.assign(new Graph(), obj);
console.log(obj.adj_list);

window.onload = function (){
    console.log(graph);
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    console.log("Hewwo ");
    console.log(graph.courseList[0].nodeKey);

    const simulation = d3.forceSimulation(graph.courseList as d3.SimulationNodeDatum[])
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2));
    
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.courseList)
        .enter().append("g")
        .call(d3.drag<SVGGElement, Node>()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));

    node.append("circle").attr("r", 10);
    
    node.append("text")
        .attr("dy", -15)
        .attr("text-anchor", "middle")
        .text(d => d.nodeKey);
    
    simulation.on("tick", () => {
        node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
    });
    
    function dragStarted(event : any, d : any) : void{
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event : any, d : any) : void {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event : any, d : any) : void{
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

}