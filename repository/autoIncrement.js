import fs from "fs";
import config from "../config.js";

export function autoIncrement () {
    try {
        let data = fs.readFileSync(config.dbFilePath, "utf-8");
        data = data.trim().split("\n");
        data = data.map(line => JSON.parse(line));
        let index = Math.max(...data.map(todo => todo.index));
        index = index + 1;
        return index;
    } catch (err) {
        const index = 1;
        return index;
    }
}