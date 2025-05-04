/*
Course represents a course node with an id, description, credits, and a list of prerequisites which are courses
 */
import Node from "./Node.js";

class Course implements Node{
    course_id : string; 
    desc : string; 
    credits: number;
    pre_req: Node[] = []; 
    

    constructor(course_id: string, credits: number){
        this.course_id = course_id; 
        this.desc = ""; 
        this.credits = credits;
    }

    //Setters:
    setDescription(desc: string) : void{
        this.desc = desc;
    } 

    setPrequisites(pre_req: Node[]){
        this.pre_req = pre_req; 
    }

    addPrequisite(p : Node){
        this.pre_req.push(p);
    }

    //Getters: 
    get courseId() : string{
        return this.course_id; 
    }

    get courseCredits() : number{
        return this.credits; 
    }

    get prerequisites() : Node[] {
        return this.pre_req;
    }  
}

export default Course;
