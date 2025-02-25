import express from "express";
import { createMessage } from "../controllers/message.controller";

const messageRoute = express.Router();

messageRoute.post("/create", createMessage);

export default messageRoute;
