import fs from "fs/promises";
import config from "../config.js";

export async function repositoryDeleteTodo (index) {
    try {
        let data = await fs.readFile(config.dbFilePath, "utf-8");
        data = data.trim().split("\n");
        data = data.map(line => JSON.parse(line));

        let newData = data.filter(data => data.index !== index);
        newData = newData.map(line => JSON.stringify(line)).join("\n")+ "\n";
        await fs.writeFile(config.dbFilePath, newData);

        return {
            result: true
        };
    } catch (err) {
        return {
            result: false
        };
    }
}