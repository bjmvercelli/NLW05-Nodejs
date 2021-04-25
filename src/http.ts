import express from "express";
import "./database";
import {createServer} from "http"
import {Server, Socket} from "socket.io"
import path from "path"

import {routes} from "./routes"

const app = express();

//https://stackoverflow.com/questions/4529586/render-basic-html-view
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile); //yarn add ejs
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
});

app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html")
});

//https://socket.io/docs/v4/server-initialization/
//https://www.npmjs.com/package/socket.io
const http = createServer(app); //criando protocolo HTTP
const io = new Server(http); //criando protocolo WS (Web Socket)

io.on("connection", (socket: Socket) => { //primeira conexão
    //console.log("Se conectou!", socket.id);
});

app.use(express.json());

app.use(routes);

export {http, io};