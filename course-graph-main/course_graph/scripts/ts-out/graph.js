import { Course } from "./course.js";
import { Clause } from "./clause.js";
import { LogicOp } from "./clause.js";
//Graph is represented by an adjacency list 
//Edges have direction and are defined (u, v) where u is a prerequisite for v.
export class Graph {
    constructor() {
        this.and_count = 0;
        this.or_count = 0;
        this.adj_list = [];
        this.courses = [];
        this.clauses = [];
    }
    // Adds a node to the graph 
    // REQUIRES: the given node does not already exist in the graph
    addNode(node) {
        this.adj_list.push([node]);
        node.setPosition(this.adj_list.length - 1); //update the position of the node
        if (node instanceof Course) {
            this.courses.push(node);
        }
        else {
            this.clauses.push(node);
        }
    }
    // Adds a prerequisite to a course; 
    addPrequisite(course, pre_req) {
        //Check if both the course and pre-req have been added => add if haven't
        //Update the adj list 
        if (!this.doesNodeExist(pre_req))
            this.addNode(pre_req);
        if (!this.doesNodeExist(course))
            this.addNode(course);
        this.addEdgeToAdjList(pre_req, course);
    }
    //Updates the adjacency list by adding an edge
    addEdgeToAdjList(start, end) {
        if (!this.doesEdgeExist(start, end))
            this.adj_list[start.position].push(end);
    }
    //Updates the adjacency list by removing an edge 
    //REQUIRES: start, end already exist in the graph
    removeEdgeFromAdjList(start, end) {
        let index = this.adj_list[start.position].indexOf(end);
        if (index >= 0)
            this.adj_list[start.position].splice(index, 1);
    }
    // Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course
    addUnionOfPrequisites(course, pre_reqs) {
        this.or_count++;
        let key = `OR${this.or_count}`;
        let clause = new Clause(LogicOp.OR, key);
        this.addClauseNodeHelper(clause, pre_reqs, course);
        return clause;
    }
    // Adds a intersection of prerequisties to an existing course.
    // This means a student must take all the courses in the pre_reqs in order to apply for the course
    addIntersectionOfPrequisites(course, pre_reqs) {
        this.and_count++;
        let key = `AND${this.and_count}`;
        let clause = new Clause(LogicOp.AND, key);
        this.addClauseNodeHelper(clause, pre_reqs, course);
        return clause;
    }
    //Helper for union and intersection
    //Given a clause node, a list of pre-reqs, and a target course, 
    //      -add clause, pre-reqs, target to the graph if haven't already
    //      -remove all edges between pre-reqs and target
    //      -make all pre-reqs point to the clause
    //      -make the clause point to the target
    addClauseNodeHelper(clause, pre_reqs, target) {
        let nodes = pre_reqs.concat(target);
        nodes.forEach(node => { if (!this.doesNodeExist(node))
            this.addNode(node); });
        this.addNode(clause);
        this.updateAdjListHelper(pre_reqs, clause, target);
    }
    //Helper for addClauseNodeHelper
    //      -remove all edges between pre-reqs and target
    //      -make all pre-reqs point to the clause
    updateAdjListHelper(pre_reqs, clause, target) {
        pre_reqs.forEach(preq => this.removeEdgeFromAdjList(preq, target));
        pre_reqs.forEach(preq => this.addEdgeToAdjList(preq, clause));
        this.addEdgeToAdjList(clause, target);
    }
    //Checks if given edge exists in graph
    doesEdgeExist(start, end) {
        for (const course of this.adj_list[start.position]) {
            if (JSON.stringify(course) === JSON.stringify(end))
                return true;
        }
        return false;
    }
    //Checks if given node exists in the graph
    doesNodeExist(node) {
        for (let i = 0; i < this.adjList.length; i++) {
            if (JSON.stringify(this.adjList[i][0]) == JSON.stringify(node))
                return true;
        }
        return false;
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
    get andCount() {
        return this.and_count;
    }
    get orCount() {
        return this.or_count;
    }
}
