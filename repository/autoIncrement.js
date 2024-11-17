import fs from "fs/promises";
import config from "../config.js";

export async function autoIncrement () {
    try {
        let data = await fs.readFile(config.dbFilePath, "utf-8");
        data = data.trim().split("\n");
        data = data.map(line => JSON.parse(line));

        let index = Math.max(...data.map(todo => todo.index));
        index = index + 1;

        return index;
    }
    catch (error) {
        const index = 1;

        return index;
    }
}