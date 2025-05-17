import { Clause } from "./clause.js";
import { LogicOp } from "./clause.js";
export class Graph {
    constructor() {
        this.adj_list = [];
        this.courses = [];
        this.clauses = [];
    }
    // Adds a node to the graph 
    // Requires that the node does not already exist 
    addNode(node) {
        //TODO:
    }
    // Adds a prerequisite to a course; 
    addPrequisite(course, pre_req) {
        //TODO:
        //Check if both the course and pre-req have been added => add if haven't
        //Update the adj list 
        if (!this.doesNodeExist(course)) {
            this.addNode(course);
        }
        if (!this.doesNodeExist(pre_req)) {
            this.addNode(pre_req);
        }
        this.updateAdjList(course, pre_req);
    }
    //Updates the adjacency list
    updateAdjList(start, end) {
        //TODO: 
        //Check if edge already exists 
        //Update the adj list
        if (!this.doesEdgeExist(start, end)) {
            //update Adj list
        }
    }
    // Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course
    addUnionOfPrequisites(course, pre_reqs) {
        //TODO:
        return new Clause(LogicOp.OR, "");
    }
    // Adds a intersection of prerequisties to an existing course.
    // This means a student must take all the courses in the pre_reqs in order to apply for the course
    addIntersectionOfPrequisites(course, pre_reqs) {
        //TODO:
        return new Clause(LogicOp.AND, "");
    }
    //Checks if given edge exists in graph
    doesEdgeExist(start, end) {
        //TODO:
        return false;
    }
    //Checks if given node exists in the graph
    doesNodeExist(node) {
        //TODO:
        return false;
    }
}
