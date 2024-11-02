import fs from "fs";
import config from "../config.js";

export function repositoryPatchTodo (index, title, description, dueDate, date, state) {
    try {
        let data = fs.readFileSync(config.dbFilePath, "utf-8");
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
        fs.writeFileSync(config.dbFilePath, newData);

        return true;
    } catch (err) {
        return false;
    }
}