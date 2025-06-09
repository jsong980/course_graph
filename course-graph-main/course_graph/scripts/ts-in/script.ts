import {Node} from "./model/node.js"; 
import {Course} from "./model/course.js"; 
import {Graph} from "./model/graph.js";
import { LogicOp, Clause } from "./model/clause.js";
import {Edge} from "./model/edge.js";
import {D3Node} from "./model/i_d3node.js";
import {D3Edge} from "./model/i_d3edge.js";

import * as d3 from 'd3';
import data from '/Users/janetsong/projects/course_graph/course-graph-main/course_graph/scripts/ts-in/data/graph_data.json' with {type: "json"}

//CITATIONS: https://observablehq.com/@d3/force-directed-graph/2

console.log("hewwo world");
var graph : Graph = parseGraph();
console.log(graph);
constructD3Graph(graph);


//functions
function parseGraph() : Graph{
  let filedata = JSON.parse(JSON.stringify(data));
  let adjList = filedata["adj_list"];
  let newGraph : Graph = new Graph();

  //Add all nodes to the graph
  for(let i : number = 0; i < adjList.length; i++){
      let objNode : any = adjList[i][0];
      let target : Node = parseNode(objNode);
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

//Given an Object node, parses the data and returns a node of type Node
//NOTE !!!: I should not use 'any' as a parameter type and this is obviously very very bad
function parseNode(objNode : any) : Node{
  let node : Node
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

function constructD3Graph(graph : Graph) : void{
  const svg = d3.select("svg");
  const width : number = parseInt(svg.attr("width"));
  const height : number = parseInt(svg.attr("height"));
  svg.append("g");

  const adjList : Array<Array<Node>> = graph.adjList; 
  const nodes : Array<D3Node> = extractNodeList(adjList);
  const edges : Array<D3Edge> = extractEdgeList(adjList, nodes);

  

  // const link = svg.append("g").selectAll("g")
  //               .data(edges)
  //               .enter()
  //               .append("line")
  //                 .style("stroke", "#000000")
  //                 .attr('fill', 'transparent')
  //                 .attr("stroke-width", 2)
  //                 .attr('marker-end', 'url(#end)');

  // Define a marker
  svg.append("defs").append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20 + 30) // adjust depending on node radius
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#000");

// Draw edges as lines with marker-end
  const link = svg.append("g").selectAll("line")
    .data(edges)
    .enter()
    .append("line")
    .attr("stroke", "#000")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow)");

  const node = svg.append("g")
                  .selectAll("g")
                  .data(nodes)
                  .enter().append("g")

  node.append("circle")
      .attr("r", 40)
      .style("fill", "#69b3a2");

  node.append("text")
        .text(d => d.id)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em") // vertical centering
        .attr('fill', "#000000")
        .style("font-size", "12px");
  
  node.call(d3.drag<SVGGElement, D3Node>()
              .on("start", dragStarted)
              .on("drag", dragged)
              .on("end", dragEnded));
  
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink<D3Node, D3Edge>(edges).id(d => d.id).distance(200))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    //wtf
    link
        .attr("x1", d => getX(d.source))
        .attr("y1", d => getY(d.source))
        .attr("x2", d => getX(d.target))
        .attr("y2", d => getY(d.target));

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
  }


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

function getX(d: string | D3Node) {
  return typeof d === "string" ? 0 : d.x ?? 0;
}
function getY(d: string | D3Node) {
  return typeof d === "string" ? 0 : d.y ?? 0;
}

function extractNodeList(adjList : Array<Array<Node>>) : Array<D3Node>{
  //TODO:
  let nodelist : Array<D3Node> = [];
  for(let i : number = 0; i < adjList.length; i++){
    nodelist.push({id: adjList[i][0].nodeKey, pos: adjList[i][0].position});
  }
  return nodelist;
}

function extractEdgeList(adjList : Array<Array<Node>>, nodes: Array<D3Node>) : Array<D3Edge>{
  //TODO:
  let edgelist : Array<D3Edge> = []
  for(let i : number = 0; i < adjList.length; i++){
    for(let j : number = 1; j < adjList[i].length; j++){
      let s : number = adjList[i][0].position;
      let t : number = adjList[i][j].position;
      edgelist.push({source: nodes[s].id, target: nodes[t].id});
    }
  }

  return edgelist;
}

// function extractNodeList(adjList : Array<Array<Node>>) : Array<Node>{
//   //TODO:
//   let nodelist : Array<Node> = [];
//   for(let i : number = 0; i < adjList.length; i++){
//     nodelist.push(adjList[i][0]);
//   }
//   return nodelist;
// }

// function extractEdgeList(adjList : Array<Array<Node>>) : Array<Edge>{
//   //TODO:
//   let edgelist : Array<Edge> = []
//   for(let i : number = 0; i < adjList.length; i++){
//     for(let j : number = 0; j < adjList[i].length; j++){
//       let edge : Edge = new Edge(adjList[i][0], adjList[i][j]);
//       edgelist.push(edge);
//     }
//   }

//   return edgelist;
// }



 
// console.log("hewwo");
// const x : number = 100;
// const y : number = 100;
// const obj = JSON.parse(JSON.stringify(data));
// const graph : Graph = Object.assign(new Graph(), obj);
// console.log(obj.adj_list);

// window.onload = function (){
//     console.log(graph);
//     const svg = d3.select("svg");
//     const width = +svg.attr("width");
//     const height = +svg.attr("height");

//     console.log("Hewwo ");
//     console.log(graph.courseList[0].nodeKey);

//     const simulation = d3.forceSimulation(graph.courseList as d3.SimulationNodeDatum[])
//         .force("charge", d3.forceManyBody().strength(-500))
//         .force("center", d3.forceCenter(width / 2, height / 2));
    
//     const node = svg.append("g")
//         .attr("class", "nodes")
//         .selectAll("g")
//         .data(graph.courseList)
//         .enter().append("g")
//         .call(d3.drag<SVGGElement, Node>()
//             .on("start", dragStarted)
//             .on("drag", dragged)
//             .on("end", dragEnded));

//     node.append("circle").attr("r", 10);
    
//     node.append("text")
//         .attr("dy", -15)
//         .attr("text-anchor", "middle")
//         .text(d => d.nodeKey);
    
//     simulation.on("tick", () => {
//         node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
//     });
    
//     function dragStarted(event : any, d : any) : void{
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     }

//     function dragged(event : any, d : any) : void {
//       d.fx = event.x;
//       d.fy = event.y;
//     }

//     function dragEnded(event : any, d : any) : void{
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     }

// }
