import {IGraph} from "./i_graph.js"
import {Node} from "./node.js";
import {Course} from "./course.js";
import {Clause} from "./clause.js";
import {LogicOp} from "./clause.js";

//Graph is represented by an adjacency list 
//Edges have direction and are defined (u, v) where u is a prerequisite for v.

export class Graph implements IGraph{
    private adj_list: Array<Array<Node>>; //represents the graph
    private courses: Array<Node>; 
    private clauses: Array<Node>;

    constructor(){
        this.adj_list = [];
        this.courses = [];
        this.clauses = []; 
    }

    // Adds a node to the graph 
    // Requires that the node does not already exist in the graph
    private addNode(node: Node): void{
        this.adj_list.push([node]);
        node.setPosition(this.adj_list.length-1);//update the position of the node
        this.courses.push(node);
    }

    // Adds a prerequisite to a course; 
    public addPrequisite(course: Node, pre_req: Node): void{
    
        //Check if both the course and pre-req have been added => add if haven't
        //Update the adj list 
        if(!this.doesNodeExist(pre_req)){
            this.addNode(pre_req);
        }

        if(!this.doesNodeExist(course)){
            this.addNode(course);
        }

        this.updateAdjList(pre_req, course);
    } 

    //Updates the adjacency list
    //REQUIRES: given start, end nodes must already exist in the graph
    private updateAdjList(start: Node, end: Node): void{
        if(!this.doesEdgeExist(start, end)){
            this.adj_list[start.position].push(end);
        }
    }

    // Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course
    public addUnionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{
        //TODO:
        return new Clause(LogicOp.OR, "");
    } 

    // Adds a intersection of prerequisties to an existing course.
    // This means a student must take all the courses in the pre_reqs in order to apply for the course
    public addIntersectionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{
        //TODO:
        return new Clause(LogicOp.AND, "");
    }

    //Checks if given edge exists in graph
    public doesEdgeExist(start : Node, end: Node):boolean{
        //TODO:
        for(const course of this.adj_list[start.position]){
            if(JSON.stringify(course) === JSON.stringify(end)) return true;
        }
        return false;
    }

    //Checks if given node exists in the graph
    public doesNodeExist(node : Node){
        //TODO:
        return this.courses.includes(node);
    }

    //Getters 
    public get courseList() : Array<Node> {
        return this.courses; 
    }

    public get clauseList() : Array<Node> {
        return this.clauses;
    }

    public get adjList() : Array<Array<Node>> {
        return this.adj_list;
    }
}