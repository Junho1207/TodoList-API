import {repositoryGetTodo} from "../repository/getTodos.js";
export function serviceGetTodo () {
    const repository = repositoryGetTodo();

    if(repository === false) {
        const status = 500;
        const message = "서버 오류입니다."
        return {status, message};
    }
    else {
        const status = 200;
        const message = repository;
        return {status, message};
    }
}