import fs from "fs";
import config from "../config.js";

export function repositoryGetTodo () {
    try {
        let data = fs.readFileSync(config.dbFilePath, "utf-8");
        data = data.trim().split("\n");
        data = data.map(line => JSON.parse(line));
        return data;
    } catch (err) {
        return false;
    }
}