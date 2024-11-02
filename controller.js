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
app.post("/todo", function (req, res){
    const {title, description, dueDate} = req.body;
    const service = servicePostTodo(title, description, dueDate);

    res.status(service.status).json({
        message: service.message
    });
});

//GET todos
app.get("/todos", function (req, res){
    const service = serviceGetTodo();

    if (service.status === 200) {
        res.status(service.status).json({
            todos: service.message
        });
    }
    else {
        res.status(service.status).json({
            message: service.message
        });
    }
});

//PATCH todo
app.patch("/todo", function (req, res) {
    const {index, title, description, dueDate, state} = req.body;
    const service = servicePatchTodo(index, title, description, dueDate, state);

    res.status(service.status).json({
        message: service.message
    });
});

//DELETE todo
app.delete("/todo", function (req, res){
    const {index} = req.body;
    const service = serviceDeleteTodo(index);

    res.status(service.status).json({
        message: service.message
    });
});

app.listen(config.port);