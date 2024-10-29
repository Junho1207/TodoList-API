import {repositoryPostTodo} from "../repository/postTodo.js";
import {autoIncrement} from "../repository/autoIncrement.js";

export function servicePostTodo (title, description) {
    if (!title || title.length > 30) {
        const status = 400;
        const message = "title은 1자 이상 30자 이하입니다.";
        return {status, message};
    }
    else if (!description || description.length > 100) {
        const status = 400;
        const message = "description은 1자 이상 100자 이하입니다."
        return {status, message};
    }
    else {
        const index = autoIncrement();
        const date = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`;
        const state = "Pending";
        const repository = repositoryPostTodo(index, title, description, date, state);

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