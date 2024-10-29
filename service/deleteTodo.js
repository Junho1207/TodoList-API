import {repositoryDeleteTodo} from "../repository/deleteTodo.js";
export function serviceDeleteTodo (index) {
    if(!index || typeof index !== "number") {
        const status = 400;
        const message = "index 형식은 int입니다.";
        return {status, message};
    }
    else {
        const repository = repositoryDeleteTodo(index);

        if(repository === true) {
            const status = 200;
            const message = "OK"
            return {status, message};
        }
        else {
            const status = 500;
            const message = "서버 오류입니다."
            return {status, message};
        }
    }
}