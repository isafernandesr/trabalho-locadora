import express from "express";
import ClienteController from "../controllers/ClienteController.js";

const ClienteRouters = express.Router();

ClienteRouters.get("/", ClienteController.getAll);
ClienteRouters.post("/", ClienteController.create);
ClienteRouters.get("/:id", ClienteController.getById);
ClienteRouters.put("/:id", ClienteController.update);
ClienteRouters.delete("/:id", ClienteController.destroy);

export default ClienteRouters;
