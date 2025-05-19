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
    private and_count: number = 0; 
    private or_count: number = 0;

    constructor(){
        this.adj_list = [];
        this.courses = [];
        this.clauses = []; 
    }

    // Adds a node to the graph 
    // REQUIRES: the given node does not already exist in the graph
    private addNode(node: Node): void{
        this.adj_list.push([node]);
        node.setPosition(this.adj_list.length-1);//update the position of the node

        if(node instanceof Course){
            this.courses.push(node);
        }else{
            this.clauses.push(node);
        }
        
    }

    // Adds a prerequisite to a course; 
    public addPrequisite(course: Node, pre_req: Node): void{
    
        //Check if both the course and pre-req have been added => add if haven't
        //Update the adj list 
        if(!this.doesNodeExist(pre_req)) this.addNode(pre_req);
        if(!this.doesNodeExist(course)) this.addNode(course);

        this.addEdgeToAdjList(pre_req, course);
    } 

    //Updates the adjacency list by adding an edge
    private addEdgeToAdjList(start: Node, end: Node): void{
        if(!this.doesEdgeExist(start, end)) this.adj_list[start.position].push(end);
    }

    //Updates the adjacency list by removing an edge 
    //REQUIRES: start, end already exist in the graph
    private removeEdgeFromAdjList(start: Node, end: Node): void{
        let index : number = this.adj_list[start.position].indexOf(end);
        if(index >= 0) this.adj_list[start.position].splice(index, 1); 
    }

    // Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course
    public addUnionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{
        //TODO:

        //Case 1: add a union of two preqs to a single course
        //Add all nodes if haven't already 
        //Add a single or clause node to the graph
        //Update adj list 

        this.or_count++;
        let key : string = `OR${this.or_count}`;
        let clause : Clause = new Clause(LogicOp.OR, key);
        this.addClauseNodeHelper(clause, pre_reqs, course);

        return clause;
    }

    // Adds a intersection of prerequisties to an existing course.
    // This means a student must take all the courses in the pre_reqs in order to apply for the course
    public addIntersectionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{
        //TODO:
        this.and_count++;
        let key : string = `AND${this.and_count}`;
        let clause : Clause = new Clause(LogicOp.AND, key);
        this.addClauseNodeHelper(clause, pre_reqs, course);

        return clause;
    }

    //Helper for union and intersection
    //Given a clause node, a list of pre-reqs, and a target course, 
    //      -add clause, pre-reqs, target to the graph if haven't already
    //      -remove all edges between pre-reqs and target
    //      -make all pre-reqs point to the clause
    //      -make the clause point to the target
    private addClauseNodeHelper(clause : Node, pre_reqs: Node[], target: Node){
        let nodes : Node [] = pre_reqs.concat(target); 

        nodes.forEach(node => {if(!this.doesNodeExist(node)) this.addNode(node)});
        this.addNode(clause);

        pre_reqs.forEach(preq => this.removeEdgeFromAdjList(preq, target));
        pre_reqs.forEach(preq => this.addEdgeToAdjList(preq, clause));

        this.addEdgeToAdjList(clause, target);
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
        for(let i : number = 0; i < this.adjList.length; i++){
            if(JSON.stringify(this.adjList[i][0]) == JSON.stringify(node)) return true;
        }
        return false;
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

    public get andCount() : number{
        return this.and_count;
    }

    public get orCount(): number{
        return this.or_count;
    }
}