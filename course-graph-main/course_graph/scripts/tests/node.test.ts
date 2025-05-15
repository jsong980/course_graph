import {expect, assert, test} from 'vitest' 
import {Node} from '../ts-in/node.js'
import {Course} from '../ts-in/course.js';
import {Clause, LogicOp} from '../ts-in/clause.js';

//Globals:
var tnode : Node = new Node('testnode'); 
var tcourse : Course = new Course('CPSC 103', 4);
var tcap : Clause = new Clause(LogicOp.AND);
var tcup : Clause = new Clause(LogicOp.OR);

test('test Node Constructor', ()=>{
    expect(tnode.nodeId).toEqual(1);
    expect(tnode.nodeKey).toEqual("testnode_1");
}); 

test('test Course Constructor', ()=>{
    expect(tcourse.nodeId).toEqual(2);
    expect(tcourse.courseId).toEqual('CPSC 103');
    expect(tcourse.nodeKey).toEqual('CPSC 103_2');
    expect(tcourse.courseCredits).toEqual(4);

}); 

test('test Clause Constructor', ()=>{
    expect(tcap.nodeId).toEqual(3);
    expect(tcap.type).toEqual(LogicOp.AND);
    expect(tcap.nodeKey).toEqual("And_3");

    expect(tcup.nodeId).toEqual(4);
    expect(tcup.type).toEqual(LogicOp.OR);
    expect(tcup.nodeKey).toEqual("Or_4");
}); 
