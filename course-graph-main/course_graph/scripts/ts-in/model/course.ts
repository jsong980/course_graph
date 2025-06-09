/*
Course represents a course node with an id, description, credits, and a list of prerequisites which are courses
 */

import {Node} from "./node.js";

export class Course extends Node{
    private course_id : string; 
    private desc : string; 
    private credits: number;

    constructor(course_id: string, credits: number){
        super(course_id, "Course");
        this.course_id = course_id; 
        this.desc = ""; 
        this.credits = credits;
    }

    //Setters:
    setDescription(desc: string) : void{
        this.desc = desc;
    } 

    //Getters: 
    get courseId() : string{
        return this.course_id; 
    }

    get courseCredits() : number{
        return this.credits; 
    }

    get courseDesc() : string{
        return this.courseDesc;
    }
}
