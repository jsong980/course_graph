import {assert, expect, test, beforeEach} from 'vitest' 
import { JsonWriter } from '../../ts-in/persistence/JsonWriter.js';
import { JsonReader } from '../../ts-in/persistence/JsonReader.js';
import { Graph } from '../../ts-in/model/graph.js';
import { Course} from '../../ts-in/model/course.js';
import { Node } from '../../ts-in/model/node.js';
import { read } from 'node:fs';
import { LogicOp, Clause } from '../../ts-in/model/clause.js';
import { json } from 'd3';

//Globals:

const FILE_PATH_3 : string = "/Users/janetsong/projects/course_graph/course-graph-main/course_graph/scripts/tests/persistence/complex_graph_data.json";
const FILE_PATH_1 : string = "/Users/janetsong/projects/course_graph/course-graph-main/course_graph/scripts/tests/persistence/one_node_graph_data.json";
const FILE_PATH_2 : string = "/Users/janetsong/projects/course_graph/course-graph-main/course_graph/scripts/tests/persistence/two_node_graph_data.json";

var reader : JsonReader; 
var writer : JsonWriter;
var simpleGraph : Graph;
var cpsc103 : Node = new Course("CPSC_V 103", 4); 
var cpsc107 : Node = new Course("CPSC_V 107", 4);
var cpsc110 : Node = new Course("CPSC_V 110", 4);
var cpsc210 : Node = new Course("CPSC_V 210", 4); 

beforeEach(()=>{
    simpleGraph = new Graph();
});


test('Constructor', ()=>{
    writer = new JsonWriter(FILE_PATH_3);
    expect(writer.dest).toEqual(FILE_PATH_3);
});

test('write to output file a single node graph', ()=>{
    writer = new JsonWriter(FILE_PATH_1);
    reader = new JsonReader(FILE_PATH_1);
   

    simpleGraph.addSingleNode(cpsc103); 
    let obj : string = JSON.stringify({nodes: [cpsc103], edges: []});
    let expected : Object = JSON.parse(obj);

    writer.saveGraph(simpleGraph);
    let readResult : Object = reader.read();
    expect(readResult).toEqual(expected);
});

test('write to output file a two node graph', ()=>{
    writer = new JsonWriter(FILE_PATH_2);
    reader = new JsonReader(FILE_PATH_2);
    
    simpleGraph.addPrequisite(cpsc107, cpsc103);
    let obj : string = JSON.stringify({nodes: [cpsc103, cpsc107], 
                                        edges: [{source: cpsc103, target: cpsc107}]});
    let expected : Object = JSON.parse(obj);

    writer.saveGraph(simpleGraph);
    let readResult : Object = reader.read();
    expect(readResult).toEqual(expected);
})

test('write to output file a complex graph', ()=>{
    writer = new JsonWriter(FILE_PATH_3);
    reader = new JsonReader(FILE_PATH_3);
    let or1 : Node = new Clause(LogicOp.OR, "OR1");
    or1.setPosition(3);
    
    initGraph(simpleGraph);
    let obj:Object = {nodes: [cpsc110, cpsc107, cpsc210, cpsc103, or1], 
                     edges:  [  {source: cpsc110, target: or1},
                                {source: cpsc107, target: or1},
                                {source: or1, target: cpsc210},
                                {source: cpsc103, target: cpsc107}]};
    let jsonObj: string = JSON.stringify(obj);
    let expected: Object = JSON.parse(jsonObj);

    writer.saveGraph(simpleGraph);
    let readResult : Object = reader.read();
    expect(readResult).toEqual(expected);
}); 


//Helpers

//Helper function for beforeEach that initializes simpleGraph
//REQUIRES: None
//MODIFIES: userGraph, this
//EXPECTS: userGraph is initialized with 5 nodes; 4 courses and 1 clause
function initGraph(userGraph : Graph) : void{
    let arr : Node[] = [cpsc110, cpsc107]
    userGraph.addUnionOfPrequisites(cpsc210, arr); 
    userGraph.addPrequisite(cpsc107, cpsc103); 
} 

