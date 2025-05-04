/**Clause represents a clause node with type having a value of either "AND" and "OR" */
class Clause {
    constructor(type) {
        this.children = [];
        this.type = type;
    }
}
export default Clause;
