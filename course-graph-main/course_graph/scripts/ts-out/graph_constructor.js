/* v8 ignore start */
//This program constructs the entire course graph and saves it to graph_data.json
import { Course } from "./model/course.js";
import { Graph } from "./model/graph.js";
// import * as d3 from 'https://cdn.skypack.dev/d3@7';
// import fs from 'fs'
// import data from '../user.json' with {type: "json"};
import { JsonWriter } from "./persistence/JsonWriter.js";
/* v8 ignore stop */
const FILE_PATH = "/Users/janetsong/projects/course_graph/course-graph-main/course_graph/scripts/ts-in/data/graph_data.json";
const CPSC103 = new Course("CPSC_V 103", 4);
const CPSC107 = new Course("CPSC_V 107", 4);
const CPSC210 = new Course("CPSC_V 210", 4);
const CPSC110 = new Course("CPSC_V 110", 4);
const GRAPH = new Graph();
const JSON_WRITER = new JsonWriter(FILE_PATH);
GRAPH.addUnionOfPrequisites(CPSC210, [CPSC110, CPSC107]);
GRAPH.addPrequisite(CPSC107, CPSC103);
JSON_WRITER.saveGraph(GRAPH);
