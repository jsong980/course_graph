import {expect, assert, test} from 'vitest' 
import {Node} from '../../ts-in/model/node.js'
import {Course} from '../../ts-in/model/course.js';
import {Clause, LogicOp} from '../../ts-in/model/clause.js';

//Globals:
var tnode : Node = new Node('testnode', "Course"); 
var tcourse : Course = new Course('CPSC 103', 4);
var tcap : Clause = new Clause(LogicOp.AND, "AND1");
var tcup : Clause = new Clause(LogicOp.OR, "OR1");

test('test Node Constructor', ()=>{
    expect(tnode.nodeKey).toEqual("testnode");
    expect(tnode.typeOfNode).toEqual("Course");
    expect(tnode.position).toEqual(-1);
}); 

test('test Course Constructor', ()=>{
    expect(tcourse.courseId).toEqual('CPSC 103');
    expect(tcourse.nodeKey).toEqual('CPSC 103');
    expect(tcourse.typeOfNode).toEqual("Course");
    expect(tcourse.courseCredits).toEqual(4);
    expect(tcourse.position).toEqual(-1);

}); 

test('test Clause Constructor AND', ()=>{
    expect(tcap.operator).toEqual(LogicOp.AND);
    expect(tcap.nodeKey).toEqual("AND1");
    expect(tcap.typeOfNode).toEqual("Clause");
    expect(tcap.position).toEqual(-1); 
}); 

test('test Clause Constructor OR', ()=>{
    expect(tcup.operator).toEqual(LogicOp.OR);
    expect(tcup.nodeKey).toEqual("OR1");
    expect(tcup.typeOfNode).toEqual("Clause");
    expect(tcap.position).toEqual(-1); 
});

