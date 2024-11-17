import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./config.js";
import {servicePostTodo} from "./service/postTodo.js";
import {serviceGetTodo} from "./service/getTodos.js";
import {servicePatchTodo} from "./service/patchTodo.js";
import {serviceDeleteTodo} from "./service/deleteTodo.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

//POST todo
app.post("/todo", async function (req, res){
    const {title, description, dueDate} = req.body;
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!title || title.length > 30) {
        return res.status(400).json({
            message: "title은 1자 이상 30자 이하입니다."
        });
    }

    if (!description || description.length > 100) {
        return res.status(400).json({
            message: "description은 1자 이상 100자 이하입니다."
        });
    }

    if (!dueDate || !regex.test(dueDate)) {
        return res.status(400).json({
            message: "dueDate는 YYYY-MM-DD 형식입니다."
        });
    }

    const service = await servicePostTodo(title, description, dueDate);

    if (service.result === true) {
        return res.status(200).json({
            message: "OK"
        });
    }

    if (service.result === false) {
        return res.status(500).json({
            message: "서버 오류입니다."
        });
    }
});

//GET todos
app.get("/todos", async function (req, res){
    const service = await serviceGetTodo();

    if (service.result === true) {
        return res.status(200).json({
            todos: service.todos
        });
    }

    if (service.result === false) {
        return res.status(500).json({
            message: "서버 오류입니다."
        });
    }
});

//PATCH todo
app.patch("/todo", async function (req, res) {
    const {index, title, description, dueDate, state} = req.body;
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!index || typeof index !== "number") {
        return res.status(400).json({
            message: "index는 필수 요소로 형식은 int입니다."
        });
    }

    if (!title || title.length > 30) {
        return res.status(400).json({
            message: "title은 1자 이상 30자 이하입니다."
        });
    }

    if (!description || description.length > 100) {
        return res.status(400).json({
            message: "description은 1자 이상 100자 이하입니다."
        });
    }

    if (!dueDate || !regex.test(dueDate)) {
        return res.status(400).json({
            message: "dueDate는 YYYY-MM-DD 형식입니다."
        });
    }

    if (state !== undefined && state.length !== 0) {
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
                return res.status(400).json({
                    message: "state는 Pending, In Progress, Completed, Cancelled 중 하나입니다."
                });
        }
    }

    const service = await servicePatchTodo(index, title, description, dueDate, state);

    if (service.result === true) {
        return res.status(200).json({
            message: "OK"
        });
    }

    if (service.result === false) {
        return res.status(500).json({
            message: "서버 오류입니다."
        });
    }
});

//DELETE todo
app.delete("/todo", async function (req, res){
    const {index} = req.body;

    if (!index || typeof index !== "number") {
        return res.status(400).json({
            message: "index는 필수 요소로 형식은 int입니다."
        });
    }

    const service = await serviceDeleteTodo(index);

    if (service.result === true) {
        return res.status(200).json({
            message: "OK"
        });
    }

    if (service.result === false) {
        return res.status(500).json({
            message: "서버 오류입니다."
        });
    }
});

app.listen(config.port);