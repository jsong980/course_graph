import { expect, test, beforeEach } from 'vitest';
import { Graph } from '../ts-in/graph.js';
import { Course } from '../ts-in/course.js';
//Globals:
var tgraph;
var cpsc110;
var cpsc103;
var cpsc107;
var cpsc213;
var cpsc210;
beforeEach(() => {
    tgraph = new Graph();
    cpsc110 = new Course("CPSC110", 4);
    cpsc103 = new Course("CPSC103", 4);
    cpsc107 = new Course("CPSC107", 4);
    cpsc213 = new Course("CPSC213", 4);
    cpsc210 = new Course("CPSC210", 4);
});
test('Add single prerequisite to a course', () => {
    tgraph.addPrequisite(cpsc107, cpsc103);
    expect(tgraph.doesEdgeExist(cpsc103, cpsc107)).toBe(true);
    let courses = [cpsc103, cpsc107];
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)));
});
test('Add single prequisites to two courses', () => {
    tgraph.addPrequisite(cpsc213, cpsc110);
    tgraph.addPrequisite(cpsc210, cpsc110);
    let courses = [cpsc213, cpsc110, cpsc210];
    courses.forEach((course) => expect(tgraph.doesEdgeExist(cpsc110, course)));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)));
});
test('Add single prequisites to three courses', () => {
    tgraph.addPrequisite(cpsc213, cpsc107);
    tgraph.addPrequisite(cpsc210, cpsc107);
    tgraph.addPrequisite(cpsc110, cpsc107);
    let courses = [cpsc213, cpsc210, cpsc110];
    courses.forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc107)));
    courses.forEach((course) => expect(tgraph.doesNodeExist(course)));
});
test('Add two prequisites to a single course', () => {
    tgraph.addPrequisite(cpsc213, cpsc210);
    tgraph.addPrequisite(cpsc213, cpsc110);
    let courses = [cpsc110, cpsc210];
    courses.forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc107)));
});
test('Add three prequisites to a single course', () => {
    tgraph.addPrequisite(cpsc213, cpsc107);
    tgraph.addPrequisite(cpsc213, cpsc110);
    tgraph.addPrequisite(cpsc210, cpsc210);
    let courses = [cpsc110, cpsc210];
    courses.forEach((course) => expect(tgraph.doesEdgeExist(course, cpsc107)));
});
test('Create graph representing part of the UBC\'s computer science curriculum', () => { });
test('Add a union of two prequisites to a course', () => { });
test('Add a union of three prequisites to a course', () => { });
test('Add a union of three prequisites to two courses', () => { });
test('Add a union of three prequisites to three courses', () => { });
test('Add a intersection of two prequisites to a course', () => { });
test('Add a intersection of three prequisites to a course', () => { });
test('Add a intersection of three prequisites to two courses', () => { });
test('Add a intersection of three prequisites to three courses', () => { });
test('Add an intersection of three prequisites and an union of three prequisites to a course', () => { });
