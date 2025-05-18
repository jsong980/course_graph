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
var cpsc221 : Node;
var cpsc121 : Node;
var math220 : Node;
var cpen221 : Node; 
var math221 : Node;
var cpsc302 : Node;

beforeEach(()=>{
    tgraph = new Graph(); 
    cpsc110 = new Course("CPSC110", 4); 
    cpsc103 = new Course("CPSC103", 4); 
    cpsc107 = new Course("CPSC107", 4); 
    cpsc213 = new Course("CPSC213", 4);
    cpsc210 = new Course("CPSC210", 4);
    cpsc221 = new Course("CPSC221", 4);
    cpsc121 = new Course("CPSC121", 4); 
    math220 = new Course("MATH220", 4); 
    cpen221 = new Course("CPEN221", 4);
    math221 = new Course("MATH221", 4);
    cpsc302 = new Course("CPSC304", 4);
    
});

test('Add single prerequisite to a course', ()=>{
    tgraph.addPrequisite(cpsc107, cpsc103); 
    expect(tgraph.doesEdgeExist(cpsc103, cpsc107)).toBe(true);

    let courses : Node[] = [cpsc103, cpsc107];
    let expected : Array<Array<Node>> = [[cpsc103, cpsc107], [cpsc107]]; 
    
    expect(tgraph.adjList).toEqual(expected);

    //Checking all appropriate nodes and edges exist
    expect(tgraph.doesEdgeExist(cpsc103, cpsc107)).toBe(true);
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));

    //Checking position of each course is correct
    for(let i : number = 0; i < tgraph.courseList.length; i++){
        expect(tgraph.courseList[i] == courses[i]).toBe(true);
        expect(courses[i].position == i).toBe(true);
    }

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList.length).toBe(2);
});

test('Add single prequisites to two courses', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc110);
    tgraph.addPrequisite(cpsc210, cpsc110);
    
    let courses : Node[] = [cpsc110, cpsc213, cpsc210];
    let expected : Array<Array<Node>> = [[cpsc110, cpsc213, cpsc210], [cpsc213], [cpsc210]];

    expect(tgraph.adjList).toEqual(expected); 

     //Checking all appropriate nodes and edges exist
    courses.forEach((course) => expect(tgraph.doesEdgeExist(cpsc110, course)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));

    //Checking position of each course is correct
    for(let i : number = 0; i < tgraph.courseList.length; i++){
        expect(tgraph.courseList[i] == courses[i]).toBe(true);
        expect(courses[i].position == i).toBe(true);
    }

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList.length).toBe(3);
});

test('Add single prequisites to three courses', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc107); 
    tgraph.addPrequisite(cpsc210, cpsc107); 
    tgraph.addPrequisite(cpsc110, cpsc107); 

    let courses : Node[] = [cpsc107, cpsc213, cpsc210, cpsc110]; 
    let expected : Array<Array<Node>> = [[cpsc107, cpsc213, cpsc210, cpsc110], [cpsc213], [cpsc210], [cpsc110]];
    
    expect(tgraph.adjList).toEqual(expected); 

    //Checking all appropriate nodes and edges exist
    courses.slice(1).forEach(course => expect(tgraph.doesEdgeExist(cpsc107, course)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));

    //Checking position of each course is correct
    for(let i : number = 0; i < tgraph.courseList.length; i++){
        expect(tgraph.courseList[i] == courses[i]).toBe(true);
        expect(courses[i].position == i).toBe(true);
    }

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList.length).toBe(4);
});


test('Add two prequisites to a single course', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc210);
    tgraph.addPrequisite(cpsc213, cpsc110); 

    let courses : Node[] = [cpsc210, cpsc213, cpsc110]; 
    let expected : Array<Array<Node>> = [[cpsc210, cpsc213], [cpsc213], [cpsc110, cpsc213]];

    expect(tgraph.adjList).toEqual(expected); 

    //Checking all appropriate nodes and edges exist
    [cpsc210, cpsc110].forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc213)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));

    //Checking position of each course is correct
    for(let i : number = 0; i < tgraph.courseList.length; i++){
        expect(tgraph.courseList[i] == courses[i]).toBe(true);
        expect(courses[i].position == i).toBe(true);
    }

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList.length).toBe(3);
});

test('Add three prequisites to a single course', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc107); 
    tgraph.addPrequisite(cpsc213, cpsc110); 
    tgraph.addPrequisite(cpsc213, cpsc210); 

    let courses : Node[] = [cpsc107, cpsc213, cpsc110, cpsc210]; 
    let expected : Array<Array<Node>> = [[cpsc107, cpsc213], [cpsc213], [cpsc110, cpsc213], [cpsc210, cpsc213]];

    expect(tgraph.adjList).toEqual(expected); 

    //Checking all appropriate nodes and edges exist
    [cpsc107, cpsc110, cpsc210].forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc213)).toBe(true));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)).toBe(true));

    //Checking position of each course is correct
    for(let i : number = 0; i < tgraph.courseList.length; i++){
        expect(tgraph.courseList[i] == courses[i]).toBe(true);
        expect(courses[i].position == i).toBe(true);
    }

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList.length).toBe(4);
    
}); 

test('Add a union of two prequisites to a course', ()=>{
    let preqs : Node[] = [cpsc107, cpsc110]; 
    

    let or1 : Node = new Clause(LogicOp.OR, "OR1");
    let expected : Array<Array<Node>> = [[cpsc107, or1], [cpsc110, or1], [cpsc210], [or1, cpsc210]];
    let nodes : Array<Node> = [cpsc107, cpsc110, cpsc210, or1]; 

    expect(tgraph.addUnionOfPrequisites(cpsc210, preqs)).toEqual(or1);//we expect a node to be returned
    expect(tgraph.adjList).toEqual(expected);

    //checking all edges in expected exist in the graph
    for(let i : number = 0; i < expected.length; i++){
        for(let j : number = 1; j <= expected[i].length-1; j++){
            expect(tgraph.doesEdgeExist(expected[i][0], expected[i][j])).toBe(true);
        }
    }

    //checking all nodes have the correct position and exist in the graph: 
    for(let i : number = 0; i < nodes.length; i++){
        expect(tgraph.doesNodeExist(nodes[i])).toBe(true);
        expect(nodes[i].position == i).toBe(true);
    }

    //checking that arrays of courses and clauses have been properly updated: 
    [cpsc107, cpsc110, cpsc210].forEach(course => {expect(tgraph.courseList.includes(course)).toBe(true)});
    expect(tgraph.courseList.length).toEqual(3);

    expect(tgraph.clauseList.includes(or1)).toBe(true);
    expect(tgraph.clauseList.length).toEqual(1);
});

test('Add a union of three prequisites to a course', ()=>{
    let preqs : Node[] = [cpsc210, cpsc121, math220]; 
   

    let or1 : Node = new Clause(LogicOp.OR, "OR1"); 
    let expected : Array<Array<Node>> = [[cpsc210, or1], [cpsc121, or1], [math220, or1], [cpsc221], [or1, cpsc221]];
    let nodes : Array<Node> = [cpsc210, cpsc121, math220, cpsc221, or1];

    expect(tgraph.addUnionOfPrequisites(cpsc210, preqs)).toEqual(or1);//we expect a node to be returned
    expect(tgraph.adjList).toEqual(expected); 

    //Check all edges in expected exist in the graph
    for(let i : number = 0; i < expected.length; i++){
        for(let j : number = 1; j <= expected[i].length-1; j++){
            expect(tgraph.doesEdgeExist(expected[i][0], expected[i][j])).toBe(true);
        }
    }

    //Check all nodes in expected exist in the graph
    for(let i : number = 0; i < nodes.length; i++){
        expect(tgraph.doesNodeExist(nodes[i])).toBe(true);
        expect(nodes[i].position == i).toBe(true);
    }

    //checking that arrays of courses and clauses have been properly updated: 
    [cpsc107, cpsc110, cpsc210, cpsc221].forEach(course => {expect(tgraph.courseList.includes(course)).toBe(true)});
    expect(tgraph.courseList.length).toEqual(4);

    expect(tgraph.clauseList.includes(or1)).toBe(true);
    expect(tgraph.clauseList.length).toEqual(1);

});

test('Add a union of two prequisites and union of three prequisites to a single course', ()=>{
    let preqs1 : Node[] = [cpsc103, cpsc110, cpen221];
    let preqs2 : Node[] = [math220, math221]; 
    let exp_or1 : Node = new Clause(LogicOp.OR, "OR1");
    let exp_or2 : Node = new Clause(LogicOp.OR, "OR2"); 
    let expected : Array<Array<Node>> = [[cpsc103, exp_or1], [cpsc110, exp_or1], 
                                        [cpen221, exp_or1], [cpsc302], [exp_or1, cpsc302],
                                        [math220, exp_or2], [math221, exp_or2], [exp_or2, cpsc302]];

    //ugly code that concats all nodes into one array 
    let exp_courses : Node[] = preqs1.concat([cpsc302].concat(preqs2));
    let exp_clauses : Node[] = [exp_or1, exp_or2]; 
    let exp_nodes : Node[] = [cpsc103, cpsc110, cpen221, cpsc302, exp_or1, math220, math221, exp_or2];

    //Function calls
    let or1 : Node = tgraph.addUnionOfPrequisites(cpsc302, preqs1);
    let or2 : Node = tgraph.addUnionOfPrequisites(cpsc302, preqs2); 

    //Check return values are correct
    expect(or1).toEqual(exp_or1);
    expect(or2).toEqual(exp_or2);

    //Check adj list is correct
    expect(tgraph.adjList).toEqual(expected);

    //checking all edges in expected exist in the graph
    for(let i : number = 0; i < expected.length; i++){
        for(let j : number = 1; j <= expected[i].length-1; j++){
            expect(tgraph.doesEdgeExist(expected[i][0], expected[i][j])).toBe(true);
        }
    }

    //checking all nodes have the correct position and exist in the graph: 
    for(let i : number = 0; i < exp_nodes.length; i++){
        expect(tgraph.doesNodeExist(exp_nodes[i])).toBe(true);
        expect(exp_nodes[i].position == i).toBe(true);
    }

    //checking that arrays of courses and clauses have been properly updated: 
    for(let i : number = 0; i < tgraph.courseList.length; i++){
        expect(tgraph.courseList[i] == exp_courses[i]).toBe(true);
    }
    expect(tgraph.courseList.length).toEqual(6);

    for(let i : number = 0; i < tgraph.clauseList.length; i++){
        expect(tgraph.clauseList[i] == exp_clauses[i]).toBe(true);
    }
    expect(tgraph.clauseList.length).toEqual(2);
});

test('Add a union of a union of two prequisites and union of three prequisites to a single course', ()=>{
    let preqs1 : Node[] = [cpsc103, cpsc110, cpen221];
    let preqs2 : Node[] = [math220, math221]; 
    let exp_or1 : Node = new Clause(LogicOp.OR, "OR1");
    let exp_or2 : Node = new Clause(LogicOp.OR, "OR2"); 
    let exp_or3 : Node = new Clause(LogicOp.OR, "OR3");
    let expected : Array<Array<Node>> = [[cpsc103, exp_or1], [cpsc110, exp_or1], 
                                        [cpen221, exp_or1], [cpsc302], [exp_or1, exp_or3],
                                        [math220, exp_or2], [math221, exp_or2], [exp_or2, exp_or3], 
                                        [exp_or3, cpsc302]];

    let exp_courses : Node[] = preqs1.concat([cpsc302].concat(preqs2));
    let exp_clauses : Node[] = [exp_or1, exp_or2, exp_or3];
    let exp_nodes : Node[] = [cpsc103, cpsc110, cpen221, cpsc302, exp_or1, 
                                math220, math221, exp_or2, exp_or3];

    //Function calls
    let or1 : Node = tgraph.addUnionOfPrequisites(cpsc302, preqs1);
    let or2 : Node = tgraph.addUnionOfPrequisites(cpsc302, preqs2); 
    let or3 : Node = tgraph.addUnionOfPrequisites(cpsc302, [or1, or2]);

    //check return values are correct 
    expect(or1).toEqual(exp_or1);
    expect(or2).toEqual(exp_or2);
    expect(or3).toEqual(exp_or3); 

    //check adj list is correct
    expect(tgraph.adjList).toEqual(expected);

    //checking all edges in expected exist in the graph
    for(let i : number = 0; i < expected.length; i++){
        for(let j : number = 1; j <= expected[i].length-1; j++){
            expect(tgraph.doesEdgeExist(expected[i][0], expected[i][j])).toBe(true);
        }
    }

    //checking all nodes have the correct position and exist in the graph: 
    for(let i : number = 0; i < exp_nodes.length; i++){
        expect(tgraph.doesNodeExist(exp_nodes[i])).toBe(true);
        expect(exp_nodes[i].position == i).toBe(true);
    }

    //checking that arrays of courses and clauses have been properly updated: 
    for(let i : number = 0; i < tgraph.courseList.length; i++){
        expect(tgraph.courseList[i] == exp_courses[i]).toBe(true);
    }
    expect(tgraph.courseList.length).toEqual(6);

    for(let i : number = 0; i < tgraph.clauseList.length; i++){
        expect(tgraph.clauseList[i] == exp_clauses[i]).toBe(true);
    }
    expect(tgraph.clauseList.length).toEqual(3);
});


test('Add a intersection of two prequisites to a course', ()=>{});

test('Add a intersection of three prequisites to a course', ()=>{});

test('Add a intersection of three prequisites to two courses', ()=>{});

test('Add a intersection of three prequisites to three courses', ()=>{});


test('Add an intersection of two prequisites and an union of three prequisites to a course', ()=>{});

test('Add an intersection of three prequisites and an union of two prequisites to a course', ()=>{});

test('Add an intersection of three prequisites and an union of three prequisites to a course', ()=>{});


test('Create graph representing part of the UBC\'s computer science curriculum', ()=>{});












