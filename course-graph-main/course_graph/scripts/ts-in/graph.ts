import {IGraph} from "./i_graph.js"
import {Node} from "./node.js";
import {Course} from "./course.js";
import {Clause} from "./clause.js";
import {LogicOp} from "./clause.js";

export class Graph implements IGraph{
    private adj_matrix: number[][];
    private matrix_row_num: number;//assuming 0-based indexing (i.e the length of the matrix)
    private matrix_capacity: number;//capacity = sqrt(matrix size)
    private courses : Map<String, Node>; //key = course-id
    private clauses : Map<number, Node>; //key = row in adj matrix

    constructor(){
        this.adj_matrix = [];
        this.matrix_capacity = 2;
        this.matrix_row_num = 0; 
        this.courses = new Map();
        this.clauses = new Map();
        this.initAdjMatrix();
    }

    //initializes the matrix
    private initAdjMatrix() : void{
        for(let i = 0; i < this.matrix_capacity; i++){
            this.adj_matrix.push([]);
            for(let j = 0; j < this.matrix_capacity; j++){
                this.adj_matrix[i].push(0);
            } 
        }
    }

    //Resizes the matrix
    private resizeAdjMatrix() : void{
        let old_capacity : number = this.matrix_capacity;
        this.matrix_capacity *= 2; 
        
        //Resize shorter rows
        for(let i = 0; i < old_capacity; i++){
            for(let j = old_capacity; j < this.matrix_capacity; j++){
                this.adj_matrix[i].push(0);
            }
        }

        //Add new rows 
        for(let i = old_capacity; i < this.matrix_capacity; i++){
            this.adj_matrix.push([]);
            for(let j = 0; j < this.matrix_capacity; j++){
                this.adj_matrix[i].push(0);
            }
        }
    }

    // Requires that given node has not yet been already added to graph
    // Adds a node to the graph
    private addNode(node: Node) : void{
        // updates the adj matrix by adding a row and a column 
        // updates the node's position in the matrix
        // depending on object type of the node, adds it to specific hashmap
        node.set_position(this.matrix_row_num);
        this.matrix_row_num++
        
        if(node instanceof Course){
            this.courses.set(node.courseId, node);
        }else{
            this.clauses.set(node.getPosition, node);
        }

        //Check if capacity is reached 
        if(this.matrix_row_num >= this.matrix_capacity/2){
            this.resizeAdjMatrix();
        }
    }; 

    // Requires that the prequisite and course both already added to the graph
    // Adds a prerequisite to an existing course
    public addPrequisite(course: Node, pre_req: Node) : void{
        // updates the adj matrix for both course and prereq
        // checks if the course and prequisite are already added to the graph 
        // adds an edge from the prequisite to the course

        let c : Course = course as Course;
        let p : Course = pre_req as Course;

        if(!this.courses.has(c.courseId)){
            this.addNode(course);
        }

        if(!this.courses.has(p.courseId)){
            this.addNode(pre_req);
        }

        this.updateAdjMatrix(pre_req.getPosition, course.getPosition, 1);
    };
    
    // Requires that x and y must be <= matrix_row_num and val to be 0 or 1
    public updateAdjMatrix(x: number, y: number, val: number){
        this.adj_matrix[x][y] = val;
    }

    // Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course 
    // Returns clause node representing OR
    public addUnionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{
        // creates an "or" node and calls addNode on it 
        // updates the adj matrix for both course and prereq and the "or" node 
        return new Clause(LogicOp.OR);//default return value
    }; 

    // Adds a intersection of prerequisities to an existing course. 
    // This means a student must take all courses in the pre_reqs in order to apply for the course 
    // Returns clause node representing OR
    public addIntersectionOfPrequisites(course: Node, pre_reqs: Node[]): Clause{
        // creates an "and" node and calls addNode on it 
        // updates the adj matrix for both course and prereq and the "and" node 
        return new Clause(LogicOp.AND);//default return value
    };

    //Getters and Setters:

    get adjMatrix() : number[][]{
        return this.adj_matrix; 
    };

    get matrixRowLength() : number{
        return this.matrix_row_num; 
    };

    get matrixCapacity() : number{
        return this.matrix_capacity; 
    }; 

    get courseNum() : number{
        return this.courses.size;
    }

    get clauseNum() : number{
        return this.clauses.size;
    }

    isCourseAdded(node : Node) : boolean{
        let c : Course = node as Course; 
        return this.courses.has(c.courseId); 
    }

    isClauseAdded(node : Node) : boolean{
        let c : Clause = node as Clause; 
        return this.clauses.has(c.getPosition);
    }

}