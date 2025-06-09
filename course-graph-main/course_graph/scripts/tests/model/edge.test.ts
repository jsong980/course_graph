import {assert, expect, test, beforeEach} from 'vitest' 
import {Node} from "../../ts-in/model/node.js";  
import {Course} from "../../ts-in/model/course.js";  
import {Edge} from "../../ts-in/model/edge.js"

//Globals:
var cpsc103 : Node = new Course("CPSC_V 103", 4); 
var cpsc107 : Node = new Course("CPSC_V 107", 4);

test("constructor", ()=>{
    let edge : Edge = new Edge(cpsc103, cpsc107); 
    expect(edge.start).toBe(cpsc103);
    expect(edge.target).toBe(cpsc107);
});