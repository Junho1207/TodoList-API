import fs from "fs";
import config from "../config.js";

export function repositoryPostTodo (index, title, description, date, state) {
    const data = JSON.stringify({index, title, description, date, state}) + "\n";
    try {
        fs.appendFileSync(config.dbFilePath, data);
        return true;
    } catch (err) {
        return false;
    }
}