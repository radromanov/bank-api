import express from "express";
import { Server } from "@presentation/server";

const app = express();

const server = new Server(app);

server.routes();
server.listen();
