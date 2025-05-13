import {expect, assert, test} from 'vitest' 
import {Node} from '../ts-in/node.js'
import {Course} from '../ts-in/course.js';
import {Clause, LogicOp} from '../ts-in/clause.js';

//Globals:
var tnode : Node = new Node(); 
var tcourse : Course = new Course('CPSC 103', 4);
var tcap : Clause = new Clause(LogicOp.AND);
var tcup : Clause = new Clause(LogicOp.OR);

test('test Node Constructor', ()=>{
    expect(tnode.getPosition).toEqual(-1);
}); 

test('test Course Constructor', ()=>{
    expect(tcourse.getPosition).toEqual(-1);
    expect(tcourse.courseId).toEqual('CPSC 103');
    expect(tcourse.courseCredits).toEqual(4);

}); 

test('test Clause Constructor', ()=>{
    expect(tcap.getPosition).toEqual(-1);
    expect(tcap.type).toEqual(LogicOp.AND);

    expect(tcup.getPosition).toEqual(-1);
    expect(tcup.type).toEqual(LogicOp.OR);
}); 
