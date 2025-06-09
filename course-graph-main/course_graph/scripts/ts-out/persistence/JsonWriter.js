import fs from 'fs';
export class JsonWriter {
    constructor(destination) {
        this.destination = destination;
    }
    writeToOutput(jsonObj) {
        //TODO: Change to try catch block instead
        // fs.writeFile(this.destination, jsonObj, (err) => {
        // if (err) {
        //     console.log('Error writing file:', err);
        // } else {
        //     console.log('Successfully wrote file');
        // }});
        try {
            fs.writeFileSync(this.destination, jsonObj);
            console.log("Successfully wrote file!");
        }
        catch (err) {
            console.log("Error writing to output file!");
        }
    }
    saveGraph(graph) {
        let graph_json = JSON.stringify(graph, null, 2);
        this.writeToOutput(graph_json);
    }
    //Getters: 
    get dest() {
        return this.destination;
    }
}
