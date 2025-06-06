import fs from 'fs';
export class JsonWriter {
    constructor(destination) {
        this.destination = destination;
    }
    writeFile(jsonObj) {
        //TODO: Change to try catch block instead
        fs.writeFile(this.destination, jsonObj, (err) => {
            if (err) {
                console.log('Error writing file:', err);
            }
            else {
                console.log('Successfully wrote file');
            }
        });
    }
    saveGraph(graph) {
        let graph_json = JSON.stringify(graph, null, 2);
        this.writeFile(graph_json);
    }
}
