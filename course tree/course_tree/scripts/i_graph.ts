/**Graph represents a directed graph, whose edges are stored in an adjacency matrix 
 * and data about the nodes are stored in node_data */

interface IGraph{

    //Adds a node to the graph
    addNode(node: Node) : void; 

    //Adds a prerequisite to an existing course
    addPrequisite(course: Node, pre_req: Node) : void;  

    //Adds a union of prerequisties to an existing course.
    // This means a student must take at least one of the courses in the pre_reqs in order to apply for the course 
    addUnionOfPrequisites(course: Node, pre_reqs: Node[]): void; 

    //Adds a intersection of prerequisities to an existing course. 
    // This means a student must take all courses in the pre_reqs in order to apply for the course 
    addIntersectionOfPrequisites(course: Node, pre_reqs: Node[]): void; 


}

export default IGraph;