import {IGraph} from "./i_graph.js"
import {Node} from "./node.js";
import {Course} from "./course.js";
import {Clause} from "./clause.js";
import {LogicOp} from "./clause.js";

export class Graph implements IGraph{
    adj_list : Array<Map<String, Node>>;
    courses : Array<Node>; 
    clauses : Array<Node>;

    constructor(){
        this.adj_list = [];
        this.courses = [];
        this.clauses = []; 
    }

    // Adds a node to the graph 
    // Requires that the node does not already exist 
    addNode(node : Node){}

    // Adds a prerequisite to a course; 
    addPrequisite(course: Node, pre_req: Node) : void{
    }; 

    // Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course
    addUnionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{}; 

    // Adds a intersection of prerequisties to an existing course.
    // This means a student must take all the courses in the pre_reqs in order to apply for the course
    addIntersectionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{};



}