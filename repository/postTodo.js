import fs from "fs/promises";
import config from "../config.js";

export async function repositoryPostTodo (index, title, description, dueDate, date, state) {
    const data = JSON.stringify({index, title, description, dueDate, date, state}) + "\n";

    try {
        await fs.appendFile(config.dbFilePath, data);

        return {
            result: true
        };
    }
    catch (error) {
        return {
            result: false
        };
    }
}