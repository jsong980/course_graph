import IGraph from "./i_graph.js"
import Node from "./Node.js";
import Course from "./course.js";
import Clause from "./clause";

class Graph implements IGraph{
    adj_matrix: number[][];  
    node_data: Node[];

    constructor(){
        this.adj_matrix = [[]];
        this.node_data = [];
    }

    
}