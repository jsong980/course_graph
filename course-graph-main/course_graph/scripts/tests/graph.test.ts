import {assert, expect, test, beforeEach} from 'vitest' 
import {Node} from "../ts-in/node.js"; 
import {Graph} from '../ts-in/graph.js'; 
import {Course} from '../ts-in/course.js';
import {Clause, LogicOp} from '../ts-in/clause.js';

//Globals:
var tgraph: Graph;
var c1 : Node;
var tcap: Node;
var tcup: Node;

beforeEach(() => {
    tgraph = new Graph();
    c1 = new Course('CPSC 103', 4);

    tcap = new Clause(LogicOp.AND);
    tcup = new Clause(LogicOp.OR);
});

test('Testing graph constructor', () => {
    expect(tgraph.matrixCapacity).toEqual(2); 
    expect(tgraph.matrixRowLength).toEqual(0);
    expect(tgraph.courseNum).toEqual(0); 
    expect(tgraph.clauseNum).toEqual(0); 

    let expected : number[][] = [[0, 0], [0, 0]];
    expect(tgraph.adjMatrix).toEqual(expected);
});


test('Adding single prerequisite to a non existing course in the graph', () => {
    let c2 : Node = new Course('CPSC 107', 4);
    tgraph.addPrequisite(c2, c1);  
    
    expect(tgraph.matrixCapacity).toEqual(8); //since we added 2 nodes, we expect two resizes.
    expect(tgraph.matrixRowLength).toEqual(2); //we added only 2 nodes to the graph 
    expect(tgraph.courseNum).toEqual(2);
    expect(tgraph.clauseNum).toEqual(0);
    expect(tgraph.isCourseAdded(c2)).toBe(true); 
    expect(tgraph.isCourseAdded(c1)).toBe(true);

    expect(c2.getPosition).toEqual(0);
    expect(c1.getPosition).toEqual(1);

    let expected : number[][] = [[0, 0, 0, 0, 0, 0, 0, 0], 
                                [1, 0, 0, 0, 0, 0, 0, 0], 
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0]]; 

    expect(tgraph.adjMatrix).toEqual(expected);
});

test('Adding two prerequisites to an existing course in the graph', () => {
    let c1 : Node = new Course('CPSC 210', 4); 
    let c2 : Node = new Course('CPSC 121', 4);
    let c3 : Node = new Course('CPSC 213', 4);

    tgraph.addPrequisite(c3, c1);
    tgraph.addPrequisite(c3, c2); 

    expect(tgraph.matrixCapacity).toEqual(8);
    expect(tgraph.matrixRowLength).toEqual(3);
    expect(tgraph.courseNum).toEqual(3);
    expect(tgraph.clauseNum).toEqual(0);
    expect(tgraph.isCourseAdded(c1)); 
    expect(tgraph.isCourseAdded(c2));
    expect(tgraph.isCourseAdded(c3));

    expect(c3.getPosition).toEqual(0);
    expect(c1.getPosition).toEqual(1);
    expect(c2.getPosition).toEqual(2);

    let expected : number[][] = [[0, 0, 0, 0, 0, 0, 0, 0], 
                                [1, 0, 0, 0, 0, 0, 0, 0],
                                [1, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0]];

    expect(tgraph.adjMatrix).toEqual(expected);
}); 

test('Adding many prerequisites to a graph enough to cause a matrix resize', () => {
    let c2: Node = new Course('CPSC 107', 4); 
    let c3: Node = new Course('CPSC 110', 4);
    let c4: Node = new Course('CPSC 210', 4); 
    let c5: Node = new Course('CPSC 213', 4);
    let c6: Node = new Course('CPSC 121', 4); 

    tgraph.addPrequisite(c2, c1);
    tgraph.addPrequisite(c4, c2);
    tgraph.addPrequisite(c4, c3); 
    tgraph.addPrequisite(c5, c4); 
    tgraph.addPrequisite(c5, c6); 
    
    expect(tgraph.matrixCapacity).toEqual(16); 
    expect(tgraph.matrixRowLength).toEqual(5); 
    expect(tgraph.courseNum).toEqual(5);

    let courses : Node[] = [c2, c1, c4, c2, c3, c5, c6]; 

    for(let i : number = 0; i < courses.length; i++){
        expect(courses[i].getPosition).toEqual(i);
    }; 

    let expected : number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});

test('Adding a union of two prerequisites for a single course', ()=> {});

test('Adding a union of prerequisites for a single course not enough to cause matrix resize', ()=> {});

test('Adding a union of prerequisites for a single course to cause matrix resize', ()=> {});

test('Adding an intersection of two prerequisites for a single course', ()=> {});

test('Adding an intersection of prerequisites for a single course not enough to cause matrix resize', ()=> {});

test('Adding an intersection of prerequisites for a single course to cause matrix resize', ()=> {});


