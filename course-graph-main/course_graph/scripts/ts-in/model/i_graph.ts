/**Graph represents a directed graph, whose edges are stored in an adjacency matrix 
 * and data about the nodes are stored in array */

import {Node} from "./node.js";
import { Clause } from "./clause.js";

export interface IGraph{

    //Adds a prerequisite to an existing course
    addPrequisite(course: Node, pre_req: Node) : void;  

    //Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course  
    // Returns a clause node representing OR
    addUnionOfPrequisites(course: Node, pre_reqs: Node[]): Clause; 

    //Adds a intersection of prerequisities to an existing course. 
    // This means a student must take all courses in the pre_reqs in order to apply for the course 
    // Returns a clause node representing AND
    addIntersectionOfPrequisites(course: Node, pre_reqs: Node[]): Clause; 

}

