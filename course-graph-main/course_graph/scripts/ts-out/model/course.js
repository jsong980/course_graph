/*
Course represents a course node with an id, description, credits, and a list of prerequisites which are courses
 */
import { Node } from "./node.js";
export class Course extends Node {
    constructor(course_id, credits) {
        super(course_id, "Course");
        this.course_id = course_id;
        this.desc = "";
        this.credits = credits;
    }
    //Setters:
    setDescription(desc) {
        this.desc = desc;
    }
    //Getters: 
    get courseId() {
        return this.course_id;
    }
    get courseCredits() {
        return this.credits;
    }
    get courseDesc() {
        return this.courseDesc;
    }
}
