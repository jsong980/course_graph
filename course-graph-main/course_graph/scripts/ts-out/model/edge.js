export class Edge {
    constructor(start, target) {
        this.from = start;
        this.to = target;
    }
    //getters 
    get start() {
        return this.from;
    }
    get target() {
        return this.to;
    }
}
