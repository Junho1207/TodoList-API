import {repositoryPatchTodo} from "../repository/patchTodo.js";

export function servicePatchTodo (index, title, description, dueDate, state) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if(!index || typeof index !== "number") {
        const status = 400;
        const message = "index는 필수 요소로 형식은 int입니다.";
        return {status, message};
    }
    else if (title !== undefined && title.length > 30 || title === "") {
        const status = 400;
        const message = "title은 1자 이상 30자 이하입니다.";
        return {status, message};
    }
    else if (description !== undefined && description.length > 100 || description === "") {
        const status = 400;
        const message = "description은 1자 이상 100자 이하입니다."
        return {status, message};
    }
    else if (dueDate !==undefined && !regex.test(dueDate)) {
        const status = 400;
        const message = "dueDate는 YYYY-MM-DD 형식입니다."
        return {status, message};
    }
    else if (state !== undefined && state.length !== 0) {
        switch (state){
            case "Pending":
                break;

            case "In Progress":
                break;

            case "Completed":
                break;

            case "Cancelled":
                break;

            default:
                const status = 400;
                const message = "state는 Pending, In Progress, Completed, Cancelled 중 하나입니다."
                return {status, message};
        }
    }

    const date = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')} ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}:${String(new Date().getSeconds()).padStart(2, '0')}`;
    const repository = repositoryPatchTodo(index, title, description, dueDate, date, state);

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