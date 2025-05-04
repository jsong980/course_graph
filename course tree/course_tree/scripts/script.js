import Course from "./course.js";
let c1 = new Course("CPSC 110", 4);
let c2 = new Course("CPSC 210", 4);
c2.addPrequisite(c1);
console.log("Hellow");
console.log(c1.courseId);
console.log(c2.prerequisites);
