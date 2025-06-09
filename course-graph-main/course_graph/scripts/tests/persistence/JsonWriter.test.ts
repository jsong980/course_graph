import {assert, expect, test, beforeEach} from 'vitest' 
import { JsonWriter } from '../../ts-in/persistence/JsonWriter.js';
import { JsonReader } from '../../ts-in/persistence/JsonReader.js';
import { Graph } from '../../ts-in/model/graph.js';
import { Course} from '../../ts-in/model/course.js';
import { Node } from '../../ts-in/model/node.js';
import { read } from 'node:fs';

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
    writer.saveGraph(simpleGraph);
    let readResult : Graph = reader.read();
    expect(readResult).toEqual(simpleGraph);
});

test('write to output file a two node graph', ()=>{
    writer = new JsonWriter(FILE_PATH_2);
    reader = new JsonReader(FILE_PATH_2);

    simpleGraph.addPrequisite(cpsc107, cpsc103);
    writer.saveGraph(simpleGraph);
    let readResult : Graph = reader.read();
    expect(readResult).toEqual(simpleGraph);
})

test('write to output file a complex graph', ()=>{
    writer = new JsonWriter(FILE_PATH_3);
    reader = new JsonReader(FILE_PATH_3);

    initGraph(simpleGraph);
    writer.saveGraph(simpleGraph);
    let readResult : Graph = reader.read();
    expect(readResult).toEqual(simpleGraph);
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

