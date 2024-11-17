import {repositoryGetTodo} from "../repository/getTodos.js";
export async function serviceGetTodo () {
    try {
        const repository = await repositoryGetTodo();

        return {
            result: repository.result,
            todos: repository.todos
        };
    }
    catch (error) {
        return {
            result: false,
            todos: null
        };
    }
}