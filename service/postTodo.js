import {repositoryPostTodo} from "../repository/postTodo.js";
import {autoIncrement} from "../repository/autoIncrement.js";

export async function servicePostTodo (title, description, dueDate) {
    try {
        const index = await autoIncrement();
        const date = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`;
        const state = "Pending";
        const repository = await repositoryPostTodo(index, title, description, dueDate, date, state);

        return {
            result: repository.result
        };
    }
    catch (error) {
        return {
            result: false
        };
    }
}