import fs from "fs/promises";
import config from "../config.js";

export async function repositoryPatchTodo (index, title, description, dueDate, date, state) {
    try {
        let data = await fs.readFile(config.dbFilePath, "utf-8");
        data = data.trim().split("\n");
        data = data.map(line => JSON.parse(line));

        data.forEach(data => {
            if(data.index === index) {
                if(title !== undefined) {
                    data.title = title
                }

                if(description !== undefined) {
                    data.description = description
                }

                if(dueDate !== undefined) {
                    data.dueDate = dueDate
                }

                if(date !== undefined) {
                    data.date = date
                }

                if(state !== undefined) {
                    data.state = state
                }
            }
        });

        let newData = data.map(line => JSON.stringify(line)).join("\n")+ "\n";
        await fs.writeFile(config.dbFilePath, newData);

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