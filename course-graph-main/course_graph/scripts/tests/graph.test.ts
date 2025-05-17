import {assert, expect, test, beforeEach} from 'vitest' 
import {Node} from "../ts-in/node.js"; 
import {Graph} from '../ts-in/graph.js'; 
import {Course} from '../ts-in/course.js';
import {Clause, LogicOp} from '../ts-in/clause.js';

//Globals:
var tgraph : Graph; 
var cpsc110 : Node;
var cpsc103 : Node; 
var cpsc107 : Node;
var cpsc213 : Node;
var cpsc210 : Node;

beforeEach(()=>{
    tgraph = new Graph(); 
    cpsc110 = new Course("CPSC110", 4); 
    cpsc103 = new Course("CPSC103", 4); 
    cpsc107 = new Course("CPSC107", 4); 
    cpsc213 = new Course("CPSC213", 4);
    cpsc210 = new Course("CPSC210", 4);
});

test('Add single prerequisite to a course', ()=>{
    tgraph.addPrequisite(cpsc107, cpsc103); 
    expect(tgraph.doesEdgeExist(cpsc103, cpsc107)).toBe(true);

    let courses : Node[] = [cpsc103, cpsc107];
    let expected : Array<Array<Node>> = [[cpsc103], [cpsc107, cpsc103]]; 

    expect(tgraph.adjList).toEqual(expected);
    expect(tgraph.doesEdgeExist(cpsc103, cpsc107));
    courses.forEach((course) => expect(tgraph.courseList.includes(course)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)));
});

test('Add single prequisites to two courses', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc110);
    tgraph.addPrequisite(cpsc210, cpsc110);
    
    let courses : Node[] = [cpsc213, cpsc110, cpsc210];
    let expected : Array<Array<Node>> = [[cpsc213], [cpsc110, cpsc213], [cpsc210], [cpsc110, cpsc210]];

    expect(tgraph.adjList).toEqual(expected); 
    courses.forEach((course) => expect(tgraph.courseList.includes(course)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesEdgeExist(cpsc110, course)));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));
});

test('Add single prequisites to three courses', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc107); 
    tgraph.addPrequisite(cpsc210, cpsc107); 
    tgraph.addPrequisite(cpsc110, cpsc107); 

    let courses : Node[] = [cpsc213, cpsc210, cpsc110]; 
    let expected : Array<Array<Node>> = [[cpsc213], [cpsc107, cpsc213, cpsc210, cpsc110], [cpsc210], [cpsc110]];
    
    expect(tgraph.adjList).toEqual(expected); 
    courses.forEach((course) => expect(tgraph.courseList.includes(course)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc107)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));
});


test('Add two prequisites to a single course', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc210);
    tgraph.addPrequisite(cpsc213, cpsc110); 

    let courses : Node[] = [cpsc110, cpsc210, cpsc213]; 
    let expected : Array<Array<Node>> = [[cpsc213], [cpsc210, cpsc213], [cpsc110, cpsc213]];

    expect(tgraph.adjList).toEqual(expected); 
    courses.forEach((course) => expect(tgraph.courseList.includes(course)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc107)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));
});

test('Add three prequisites to a single course', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc107); 
    tgraph.addPrequisite(cpsc213, cpsc110); 
    tgraph.addPrequisite(cpsc213, cpsc210); 

    let courses : Node[] = [cpsc110, cpsc210, cpsc213, cpsc107]; 
    let expected : Array<Array<Node>> = [[cpsc213], [cpsc107, cpsc213], [cpsc110, cpsc213], [cpsc210, cpsc213]];

    expect(tgraph.adjList).toEqual(expected); 
    courses.forEach((course) => expect(tgraph.courseList.includes(course)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc107)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));
}); 


test('Add a union of two prequisites to a course', ()=>{});

test('Add a union of three prequisites to a course', ()=>{});

test('Add a union of three prequisites to two courses', ()=>{});

test('Add a union of three prequisites to three courses', ()=>{});


test('Add a intersection of two prequisites to a course', ()=>{});

test('Add a intersection of three prequisites to a course', ()=>{});

test('Add a intersection of three prequisites to two courses', ()=>{});

test('Add a intersection of three prequisites to three courses', ()=>{});


test('Add an intersection of three prequisites and an union of three prequisites to a course', ()=>{});

test('Create graph representing part of the UBC\'s computer science curriculum', ()=>{});












