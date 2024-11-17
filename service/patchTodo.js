import {repositoryPatchTodo} from "../repository/patchTodo.js";

export async function servicePatchTodo (index, title, description, dueDate, state) {
    try {
        const date = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`;
        const repository = await repositoryPatchTodo(index, title, description, dueDate, date, state);

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