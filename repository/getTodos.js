import fs from "fs/promises";
import config from "../config.js";

export async function repositoryGetTodo () {
    try {
        let data = await fs.readFile(config.dbFilePath, "utf-8");
        data = data.trim().split("\n");
        data = data.map(line => JSON.parse(line));

        return {
            result: true,
            todos: data
        };
    }
    catch (error) {
        return {
            result: false,
            todos: null
        };
    }
}