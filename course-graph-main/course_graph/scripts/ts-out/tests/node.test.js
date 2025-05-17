import { expect, test } from 'vitest';
import { Node } from '../ts-in/node.js';
import { Course } from '../ts-in/course.js';
import { Clause, LogicOp } from '../ts-in/clause.js';
//Globals:
var tnode = new Node('testnode');
var tcourse = new Course('CPSC 103', 4);
var tcap = new Clause(LogicOp.AND, "AND1");
var tcup = new Clause(LogicOp.OR, "OR1");
var tcup2 = new Clause(LogicOp.OR, "OR2");
var tcap2 = new Clause(LogicOp.AND, "AND2");
test('test Node Constructor', () => {
    expect(tnode.nodeKey).toEqual("testnode");
});
test('test Course Constructor', () => {
    expect(tcourse.courseId).toEqual('CPSC 103');
    expect(tcourse.nodeKey).toEqual('CPSC 103');
    expect(tcourse.courseCredits).toEqual(4);
});
test('test Clause Constructor', () => {
    expect(tcap.operator).toEqual(LogicOp.AND);
    expect(tcap.nodeKey).toEqual("AND1");
    expect(tcup.operator).toEqual(LogicOp.OR);
    expect(tcup.nodeKey).toEqual("OR1");
    expect(tcup2.operator).toEqual(LogicOp.OR);
    expect(tcup2.nodeKey).toEqual("OR2");
    expect(tcap2.operator).toEqual(LogicOp.AND);
    expect(tcap2.nodeKey).toEqual("AND2");
});
