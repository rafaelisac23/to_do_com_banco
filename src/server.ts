import express, { urlencoded } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import router from "./routes/mainRoute";
import { errorHandler, noFoundRequest } from "./routes/errorHandler";

dotenv.config();

const server = express();

server.use(express.json());
server.use(helmet());
server.use(express.json());
server.use(urlencoded({ extended: true }));
server.use("/", router);
server.use(noFoundRequest);
server.use(errorHandler);

const port = process.env.PORT;

server.listen(process.env.PORT || 3000, () => {
  console.log("Projeto rodando na porta http://localhost:3000");
});
