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
    cpsc302 = new Course("CPSC302", 4);
    
});

test('test constructor', ()=>{
    expect(tgraph.adjList.length).toEqual(0);
    expect(tgraph.courseList.length).toEqual(0);
    expect(tgraph.clauseList.length).toEqual(0);
    expect(tgraph.orCount).toEqual(0);
    expect(tgraph.andCount).toEqual(0);
});

test('Add single prerequisite to a course', ()=>{
    tgraph.addPrequisite(cpsc107, cpsc103); 
    expect(tgraph.doesEdgeExist(cpsc103, cpsc107)).toBe(true);

    let courses : Node[] = [cpsc103, cpsc107];
    let expected : Array<Array<Node>> = [[cpsc103, cpsc107], [cpsc107]]; 
    
    expect(tgraph.adjList).toEqual(expected);

     //Checking all appropriate nodes and edges exist
    checkAllEdgesExist(expected, tgraph);
    checkAllNodesExist(courses, tgraph);

    //Checking position of each course is correct
    checkPositionsOfNodes(courses);

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList).toEqual(courses);

    //Check andCount and orCount
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(0);
});

test('Add single prequisites to two courses', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc110);
    tgraph.addPrequisite(cpsc210, cpsc110);
    
    let courses : Node[] = [cpsc110, cpsc213, cpsc210];
    let expected : Array<Array<Node>> = [[cpsc110, cpsc213, cpsc210], [cpsc213], [cpsc210]];

    expect(tgraph.adjList).toEqual(expected); 

     //Checking all appropriate nodes and edges exist
    checkAllEdgesExist(expected, tgraph);
    checkAllNodesExist(courses, tgraph);

    //Checking position of each course is correct
    checkPositionsOfNodes(courses);

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList).toEqual(courses);

    //Check andCount and orCount
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(0);
});

test('Add single prequisites to three courses', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc107); 
    tgraph.addPrequisite(cpsc210, cpsc107); 
    tgraph.addPrequisite(cpsc110, cpsc107); 

    let courses : Node[] = [cpsc107, cpsc213, cpsc210, cpsc110]; 
    let expected : Array<Array<Node>> = [[cpsc107, cpsc213, cpsc210, cpsc110], [cpsc213], [cpsc210], [cpsc110]];
    
    expect(tgraph.adjList).toEqual(expected); 

    //Checking all appropriate nodes and edges exist
    checkAllEdgesExist(expected, tgraph);
    checkAllNodesExist(courses, tgraph);

    //Checking position of each course is correct
    checkPositionsOfNodes(courses);

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList).toEqual(courses);

    //Check andCount and orCount
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(0);
});


test('Add two prequisites to a single course', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc210);
    tgraph.addPrequisite(cpsc213, cpsc110); 

    let courses : Node[] = [cpsc210, cpsc213, cpsc110]; 
    let expected : Array<Array<Node>> = [[cpsc210, cpsc213], [cpsc213], [cpsc110, cpsc213]];

    expect(tgraph.adjList).toEqual(expected); 

    //Checking all appropriate nodes and edges exist
    checkAllEdgesExist(expected, tgraph);
    checkAllNodesExist(courses, tgraph);

    //Checking position of each course is correct
    checkPositionsOfNodes(courses);

    //Checking courseList have been updated properly: 
    expect(tgraph.courseList).toEqual(courses);

    //Check andCount and orCount
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(0);
});

test('Add three prequisites to a single course', ()=>{
    tgraph.addPrequisite(cpsc213, cpsc107); 
    tgraph.addPrequisite(cpsc213, cpsc110); 
    tgraph.addPrequisite(cpsc213, cpsc210); 

    let exp_courses : Node[] = [cpsc107, cpsc213, cpsc110, cpsc210]; 
    let expected : Array<Array<Node>> = [[cpsc107, cpsc213], [cpsc213], [cpsc110, cpsc213], [cpsc210, cpsc213]];

    expect(tgraph.adjList).toEqual(expected); 
    checkAllEdgesExist(expected, tgraph);

    //Checking each course is exists and position is correct
    checkAllNodesExist(exp_courses, tgraph);
    checkPositionsOfNodes(exp_courses);

    //Check courseList and clauseList are properly updated
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual([]); 

    //Check andCount and orCount
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(0);
    
}); 

test('Add a union of two prequisites to a course', ()=>{
    let preqs : Node[] = [cpsc107, cpsc110]; 
    let exp_or1 : Node = new Clause(LogicOp.OR, "OR1");
    exp_or1.setPosition(3);

    let expected : Array<Array<Node>> = [[cpsc107, exp_or1], [cpsc110, exp_or1], [cpsc210], [exp_or1, cpsc210]];
    let exp_nodes : Array<Node> = [cpsc107, cpsc110, cpsc210, exp_or1]; 
    let exp_courses : Array<Node> = [cpsc107, cpsc110, cpsc210];
    let exp_clauses : Array<Node> = [exp_or1];
    
    expect(tgraph.addUnionOfPrequisites(cpsc210, preqs)).toEqual(exp_or1);//we expect a node to be returned
    expect(tgraph.adjList).toEqual(expected);

    //checking all edges in expected exist in the graph
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph);
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses);

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(1);
});

test('Add a union of three prequisites to a course', ()=>{
    let preqs : Node[] = [cpsc210, cpsc121, math220]; 
    let or1 : Node = new Clause(LogicOp.OR, "OR1"); 
    or1.setPosition(4);

    let expected : Array<Array<Node>> = [[cpsc210, or1], [cpsc121, or1], [math220, or1], [cpsc221], [or1, cpsc221]];
    let exp_nodes : Array<Node> = [cpsc210, cpsc121, math220, cpsc221, or1];
    let exp_courses : Array<Node> = [cpsc210, cpsc121, math220, cpsc221];

    expect(tgraph.addUnionOfPrequisites(cpsc221, preqs)).toEqual(or1);//we expect a node to be returned
    expect(tgraph.adjList).toEqual(expected); 

    //Check all edges in expected exist in the graph
    checkAllEdgesExist(expected, tgraph);
    
    //Check all nodes in expected exist in the graph
    checkAllNodesExist(exp_nodes, tgraph);
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual([or1]);

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(1);

});

test('Add a union of two prequisites and union of three prequisites to a single course', ()=>{
    let preqs1 : Node[] = [cpsc103, cpsc110, cpen221];
    let preqs2 : Node[] = [math220, math221]; 
    let exp_or1 : Node = new Clause(LogicOp.OR, "OR1");
    let exp_or2 : Node = new Clause(LogicOp.OR, "OR2"); 
    exp_or1.setPosition(4);
    exp_or2.setPosition(7);

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
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph);
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses); 

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(0);
    expect(tgraph.orCount).toEqual(2);
});

test('Add a union of a union of two prequisites and union of three prequisites to the same course', ()=>{
    let preqs1 : Node[] = [cpsc103, cpsc110, cpen221];
    let preqs2 : Node[] = [math220, math221]; 
    let exp_or1 : Node = new Clause(LogicOp.OR, "OR1");
    let exp_or2 : Node = new Clause(LogicOp.OR, "OR2"); 
    let exp_or3 : Node = new Clause(LogicOp.OR, "OR3");
    exp_or1.setPosition(4);
    exp_or2.setPosition(7);
    exp_or3.setPosition(8);
    
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
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph);
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated:  
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses);
});

test('Add a intersection of two prequisites to a course', ()=>{
    let preq : Node[] = [cpsc121, cpsc210];
    let exp_and1 : Node = new Clause(LogicOp.AND, "AND1"); 
    exp_and1.setPosition(3); 

    let expected : Array<Array<Node>> = [[cpsc121, exp_and1], [cpsc210, exp_and1], 
                                        [cpsc221], [exp_and1, cpsc221]];

                                    
    let exp_courses : Node[] = preq.concat(cpsc221);
    let exp_nodes : Node[] = exp_courses.concat(exp_and1);
    let exp_clauses : Node[] = [exp_and1];

    let and1 : Node =  tgraph.addIntersectionOfPrequisites(cpsc221, preq); 

    //Check return values
    expect(and1).toEqual(exp_and1);

    //Check adj list is correct
    expect(tgraph.adjList).toEqual(expected); 

    //checking all edges in expected exist in the graph
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph); 
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses); 

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(1);
    expect(tgraph.orCount).toEqual(0);
});

test('Add a intersection of three prequisites to a course', ()=>{
    let preq : Node[] = [cpsc110, cpsc210, cpsc121]; 
    let exp_and1 : Node = new Clause(LogicOp.AND, "AND1"); 
    exp_and1.setPosition(4);
    let expected : Array<Array<Node>> = [[cpsc110, exp_and1], [cpsc210, exp_and1], 
                                        [cpsc121, exp_and1], [cpsc213],[exp_and1, cpsc213]]; 

    let exp_courses : Node[] = preq.concat(cpsc213); 
    let exp_nodes : Node[] = exp_courses.concat(exp_and1);
    let exp_clauses : Node[] = [exp_and1];
    
    let and1 : Node = tgraph.addIntersectionOfPrequisites(cpsc213, preq); 

    //Check return values 
    expect(and1).toEqual(exp_and1);  

    //Check adj list is correct 
    expect(tgraph.adjList).toEqual(expected); 

    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph); 
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses); 

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(1);
    expect(tgraph.orCount).toEqual(0);
});

test('Add an intersection of two courses and an intersection of three courses to the same course', ()=>{
    let preq1 : Node[] = [cpsc110, cpsc210, cpsc121]; 
    let preq2 : Node[] = [cpsc221, cpsc213];

    let exp_and1 : Node = new Clause(LogicOp.AND, "AND1");
    let exp_and2 : Node = new Clause(LogicOp.AND, "AND2");
    exp_and1.setPosition(4); 
    exp_and2.setPosition(7);

    let expected : Array<Array<Node>> = [[cpsc110, exp_and1], [cpsc210, exp_and1], [cpsc121, exp_and1], 
                                        [cpsc302], [exp_and1, cpsc302], [cpsc221, exp_and2], 
                                        [cpsc213, exp_and2], [exp_and2, cpsc302]];

    let exp_courses : Node[] = preq1.concat([cpsc302].concat(preq2));
    let exp_nodes : Node[] = preq1.concat([cpsc302, exp_and1].concat(preq2.concat(exp_and2)));
    let exp_clauses : Node[] = [exp_and1, exp_and2]; 

    let and1 = tgraph.addIntersectionOfPrequisites(cpsc302, preq1);
    let and2 = tgraph.addIntersectionOfPrequisites(cpsc302, preq2); 

    //Check return values
    expect(and1).toEqual(exp_and1); 
    expect(and2).toEqual(exp_and2); 

    //Check adj list is correct 
    expect(tgraph.adjList).toEqual(expected); 

    //checking all edges in expected exist in the graph
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph); 
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses); 

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(2);
    expect(tgraph.orCount).toEqual(0);
});

test('Add an intersection of an intersection of two courses and an intersection of three courses to the same course', ()=>{
    let preq1 : Node[] = [cpsc110, cpsc210, cpsc121]; 
    let preq2 : Node[] = [cpsc221, cpsc213];

    let exp_and1 : Node = new Clause(LogicOp.AND, "AND1");
    let exp_and2 : Node = new Clause(LogicOp.AND, "AND2");
    let exp_and3 : Node = new Clause(LogicOp.AND, "AND3"); 

    exp_and1.setPosition(4);
    exp_and2.setPosition(7);
    exp_and3.setPosition(8);

    let expected : Array<Array<Node>> = [[cpsc110, exp_and1], [cpsc210, exp_and1], [cpsc121, exp_and1], 
                                        [cpsc302], [exp_and1, exp_and3], [cpsc221, exp_and2], 
                                        [cpsc213, exp_and2], [exp_and2, exp_and3], [exp_and3, cpsc302]];

    let exp_courses : Node[] = preq1.concat([cpsc302].concat(preq2));
    let exp_nodes : Node[] = preq1.concat([cpsc302, exp_and1].concat(preq2.concat([exp_and2, exp_and3])));
    let exp_clauses : Node[] = [exp_and1, exp_and2, exp_and3]; 

    let and1 = tgraph.addIntersectionOfPrequisites(cpsc302, preq1);
    let and2 = tgraph.addIntersectionOfPrequisites(cpsc302, preq2);
    let and3 = tgraph.addIntersectionOfPrequisites(cpsc302, [and1, and2]); 

    //Check return values
    expect(and3).toEqual(exp_and3); 

    //Check adj list is correct 
    expect(tgraph.adjList).toEqual(expected); 

    //checking all edges in expected exist in the graph
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph); 
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses); 

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(3);
    expect(tgraph.orCount).toEqual(0);
});

test('Add an intersection of three prequisites and an union of two prequisites to a course', ()=>{
    let preq1 : Node[] = [cpsc110, cpsc210, cpsc103]; 
    let preq2 : Node[] = [cpsc121, math220];

    let exp_and : Node = new Clause(LogicOp.AND, "AND1");
    let exp_or : Node = new Clause(LogicOp.OR, "OR1"); 

    exp_and.setPosition(4);
    exp_or.setPosition(7);

    let expected : Array<Array<Node>> = [[cpsc110, exp_and], [cpsc210, exp_and], [cpsc103, exp_and], [cpsc221],
                                         [exp_and, cpsc221], [cpsc121, exp_or], [math220, exp_or], 
                                         [exp_or, cpsc221]];

    let exp_courses : Node[] = preq1.concat([cpsc221].concat(preq2)); 
    let exp_nodes : Node[] = [cpsc110, cpsc210, cpsc103, cpsc221, exp_and, cpsc121, math220, exp_or]; 
    let exp_clauses : Node[] = [exp_and, exp_or]; 

    let res_and = tgraph.addIntersectionOfPrequisites(cpsc221, preq1);
    let res_or = tgraph.addUnionOfPrequisites(cpsc221, preq2);
    
    //Check return values 
    expect(res_and).toEqual(exp_and);
    expect(res_or).toEqual(exp_or); 

    //Check adj list is correct 
    expect(tgraph.adjList).toEqual(expected); 

    //checking all edges in expected exist in the graph
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph); 
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses); 

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(1);
    expect(tgraph.orCount).toEqual(1);
});

test('Add an intersection of an intersection and a union', ()=>{
    let preq1 : Node[] = [cpsc110, cpsc210, cpsc103]; 
    let preq2 : Node[] = [cpsc121, math220];

    let exp_and : Node = new Clause(LogicOp.AND, "AND1");
    let exp_or : Node = new Clause(LogicOp.OR, "OR1"); 
    let exp_and2 : Node = new Clause(LogicOp.AND, "AND2"); 

    exp_and.setPosition(4); 
    exp_or.setPosition(7);
    exp_and2.setPosition(8);

    let expected : Array<Array<Node>> = [[cpsc110, exp_and], [cpsc210, exp_and], [cpsc103, exp_and], [cpsc221],
                                         [exp_and, exp_and2], [cpsc121, exp_or], [math220, exp_or], 
                                         [exp_or, exp_and2], [exp_and2, cpsc221]];

    let exp_courses : Node[] = preq1.concat([cpsc221].concat(preq2)); 
    let exp_nodes : Node[] = [cpsc110, cpsc210, cpsc103, cpsc221, exp_and, cpsc121, math220, exp_or, exp_and2]; 
    let exp_clauses : Node[] = [exp_and, exp_or, exp_and2]; 

    let res_and = tgraph.addIntersectionOfPrequisites(cpsc221, preq1);
    let res_or = tgraph.addUnionOfPrequisites(cpsc221, preq2);
    let res = tgraph.addIntersectionOfPrequisites(cpsc221, [res_and, res_or]); 

    //Check return value 
    expect(res).toEqual(exp_and2);
    
    //Check adj list is correct 
    expect(tgraph.adjList).toEqual(expected); 

    //checking all edges in expected exist in the graph
    checkAllEdgesExist(expected, tgraph);

    //checking all nodes have the correct position and exist in the graph: 
    checkAllNodesExist(exp_nodes, tgraph); 
    checkPositionsOfNodes(exp_nodes);

    //checking that arrays of courses and clauses have been properly updated: 
    expect(tgraph.courseList).toEqual(exp_courses);
    expect(tgraph.clauseList).toEqual(exp_clauses); 

    //checking andCount and orCount are properly updated
    expect(tgraph.andCount).toEqual(2);
    expect(tgraph.orCount).toEqual(1);
});

test('Create graph representing part of the UBC\'s computer science curriculum', ()=>{

});


//Helpers:

//Given an adj list, checks all edges within list exists in given graph
function checkAllEdgesExist(expected : Array<Array<Node>>, tgraph : Graph) : void{
     //checking all edges in expected adj list exist in the graph
    for(let i : number = 0; i < expected.length; i++){
        for(let j : number = 1; j <= expected[i].length-1; j++){
            expect(tgraph.doesEdgeExist(expected[i][0], expected[i][j])).toBe(true);
        }
    }
}

//Given a list of nodes, checks all nodes in list exists in given graph
function checkAllNodesExist(exp_nodes : Node[], tgraph : Graph) : void{
    //checking all nodes exist in the graph: 
    for(let i : number = 0; i < exp_nodes.length; i++){
        expect(tgraph.doesNodeExist(exp_nodes[i])).toBe(true);
    }
}

//Given a list of nodes, checks all nodes in list have correct position
//Assumes list of nodes are in ascending order of their positions and are consecutive without any gaps.
function checkPositionsOfNodes(exp_nodes : Node[]) : void{
    //checking all nodes have the correct position;
    for(let i : number = 0; i < exp_nodes.length; i++){
        expect(exp_nodes[i].position).toEqual(i);
    }
}









