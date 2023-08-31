const express = require('express');
const app = express();

app.set("view engine", "ejs");

const todos = [{
    todoId: "1",
    todoTask: "Code",
},
    {
        todoId: "2",
        todoTask: "Sleep",
    },
    {
        todoId: "3",
        todoTask: "Coffee",
    }
];

app.use(express.json());
app.use(express.urlencoded({extended: True}));

