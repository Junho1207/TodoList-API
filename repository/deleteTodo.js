import fs from "fs";
import config from "../config.js";

export function repositoryDeleteTodo (index) {
    try {
        let data = fs.readFileSync(config.dbFilePath, "utf-8");
        data = data.trim().split("\n");
        data = data.map(line => JSON.parse(line));

        let newData = data.filter(data => data.index !== index);
        newData = newData.map(line => JSON.stringify(line)).join("\n")+ "\n";
        fs.writeFileSync(config.dbFilePath, newData);

        return true;
    } catch (err) {
        return false;
    }
}