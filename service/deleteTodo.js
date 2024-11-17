import {repositoryDeleteTodo} from "../repository/deleteTodo.js";
export async function serviceDeleteTodo (index) {
    try {
        const repository = await repositoryDeleteTodo(index);

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