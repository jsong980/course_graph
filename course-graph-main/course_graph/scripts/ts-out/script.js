import { Course } from "./model/course.js";
import { Graph } from "./model/graph.js";
import { LogicOp, Clause } from "./model/clause.js";
import * as d3 from 'd3';
import data from '/Users/janetsong/projects/course_graph/course-graph-main/course_graph/scripts/ts-in/data/graph_data.json' with { type: "json" };
//CITATIONS: https://observablehq.com/@d3/force-directed-graph/2
console.log("hewwo world");
var graph = parseGraph();
console.log(graph);
constructD3Graph(graph);
//functions
function parseGraph() {
    let filedata = JSON.parse(JSON.stringify(data));
    let adjList = filedata["adj_list"];
    let newGraph = new Graph();
    //Add all nodes to the graph
    for (let i = 0; i < adjList.length; i++) {
        let objNode = adjList[i][0];
        let target = parseNode(objNode);
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
//Given an Object node, parses the data and returns a node of type Node
//NOTE !!!: I should not use 'any' as a parameter type and this is obviously very very bad
function parseNode(objNode) {
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
function constructD3Graph(graph) {
    const svg = d3.select("svg");
    const width = parseInt(svg.attr("width"));
    const height = parseInt(svg.attr("height"));
    svg.append("g");
    const adjList = graph.adjList;
    const nodes = extractNodeList(adjList);
    const edges = extractEdgeList(adjList, nodes);
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
        .enter().append("g");
    node.append("circle")
        .attr("r", 40)
        .style("fill", "#69b3a2");
    node.append("text")
        .text(d => d.id)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em") // vertical centering
        .attr('fill', "#000000")
        .style("font-size", "12px");
    node.call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(edges).id(d => d.id).distance(200))
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
    function dragStarted(event, d) {
        if (!event.active)
            simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragEnded(event, d) {
        if (!event.active)
            simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}
function getX(d) {
    var _a;
    return typeof d === "string" ? 0 : (_a = d.x) !== null && _a !== void 0 ? _a : 0;
}
function getY(d) {
    var _a;
    return typeof d === "string" ? 0 : (_a = d.y) !== null && _a !== void 0 ? _a : 0;
}
function extractNodeList(adjList) {
    //TODO:
    let nodelist = [];
    for (let i = 0; i < adjList.length; i++) {
        nodelist.push({ id: adjList[i][0].nodeKey, pos: adjList[i][0].position });
    }
    return nodelist;
}
function extractEdgeList(adjList, nodes) {
    //TODO:
    let edgelist = [];
    for (let i = 0; i < adjList.length; i++) {
        for (let j = 1; j < adjList[i].length; j++) {
            let s = adjList[i][0].position;
            let t = adjList[i][j].position;
            edgelist.push({ source: nodes[s].id, target: nodes[t].id });
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
