import { Clause } from "./clause.js";
import { LogicOp } from "./clause.js";
export class Graph {
    constructor() {
        this.adj_list = [];
        this.courses = [];
        this.clauses = [];
    }
    // Adds a node to the graph 
    // Requires that the node does not already exist in the graph
    addNode(node) {
        //TODO:
        this.adj_list.push([node]);
        node.setPosition(this.adj_list.length - 1); //update the position of the node
        this.courses.push(node);
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
        this.updateAdjList(pre_req, course);
    }
    //Updates the adjacency list
    //REQUIRES: given start, end nodes must already exist in the graph
    updateAdjList(start, end) {
        //TODO: 
        //Check if edge already exists 
        //Update the adj list
        if (!this.doesEdgeExist(start, end)) {
            this.adj_list[start.position].push(end);
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
        this.adj_list[start.position].forEach(course => {
            if (course == end)
                return true;
        });
        return false;
    }
    //Checks if given node exists in the graph
    doesNodeExist(node) {
        //TODO:
        return this.courses.includes(node);
    }
    //Getters 
    get courseList() {
        return this.courses;
    }
    get clauseList() {
        return this.clauses;
    }
    get adjList() {
        return this.adj_list;
    }
}
