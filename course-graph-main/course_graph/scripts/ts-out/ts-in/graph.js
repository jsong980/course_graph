import { Course } from "./course.js";
export class Graph {
    constructor() {
        this.adj_matrix = [];
        this.matrix_capacity = 2;
        this.matrix_row_num = 0;
        this.course_nodes = [];
        this.clause_nodes = [];
        this.initAdjMatrix();
    }
    //initializes the matrix
    initAdjMatrix() {
        for (let i = 0; i < this.matrix_capacity; i++) {
            this.adj_matrix.push([]);
            for (let j = 0; j < this.matrix_capacity; j++) {
                this.adj_matrix[i].push(0);
            }
        }
    }
    //Resizes the matrix
    resizeAdjMatrix() {
        let old_capacity = this.matrix_capacity;
        this.matrix_capacity *= 2;
        //Resize shorter rows
        for (let i = 0; i < old_capacity; i++) {
            for (let j = old_capacity; j < this.matrix_capacity; j++) {
                this.adj_matrix[i].push(0);
            }
        }
        //Add new rows 
        for (let i = old_capacity; i < this.matrix_capacity; i++) {
            this.adj_matrix.push([]);
            for (let j = 0; j < this.matrix_capacity; j++) {
                this.adj_matrix[i].push(0);
            }
        }
    }
    //Adds a node to the graph
    addNode(node) {
        // updates the adj matrix by adding a row and a column 
        // updates the node's position in the matrix
        // depending on object type of the node, adds it to specific array
        node.set_position(this.matrix_row_num);
        this.matrix_row_num++;
        if (node instanceof Course) {
            this.course_nodes.push(node);
        }
        else {
            this.clause_nodes.push(node);
        }
        //Check if capacity is reached 
        if (this.matrix_row_num >= this.matrix_capacity) {
            this.resizeAdjMatrix();
        }
    }
    ;
    // Requires that the prequisite and course both already added to the graph
    // Adds a prerequisite to an existing course
    addPrequisite(course, pre_req) {
        // updates the adj matrix for both course and prereq
        this.updateAdjMatrix(course.position, pre_req.position, 1);
        this.updateAdjMatrix(pre_req.position, course.position, 1);
    }
    ;
    // Requires that x and y must be <= matrix_row_num and val to be 0 or 1
    updateAdjMatrix(x, y, val) {
        this.adj_matrix[x][y] = val;
    }
    // Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course 
    addUnionOfPrequisites(course, pre_reqs) {
        // creates an "or" node and calls addNode on it 
        // updates the adj matrix for both course and prereq and the "or" node 
    }
    ;
    //Adds a intersection of prerequisities to an existing course. 
    // This means a student must take all courses in the pre_reqs in order to apply for the course 
    addIntersectionOfPrequisites(course, pre_reqs) {
        // creates an "and" node and calls addNode on it 
        // updates the adj matrix for both course and prereq and the "and" node 
    }
    ;
}
