class Course {
    constructor(course_id, credits) {
        this.pre_req = [];
        this.course_id = course_id;
        this.desc = "";
        this.credits = credits;
    }
    //Setters:
    setDescription(desc) {
        this.desc = desc;
    }
    setPrequisites(pre_req) {
        this.pre_req = pre_req;
    }
    addPrequisite(p) {
        this.pre_req.push(p);
    }
    //Getters: 
    get courseId() {
        return this.course_id;
    }
    get courseCredits() {
        return this.credits;
    }
    get prerequisites() {
        return this.pre_req;
    }
}
export default Course;
