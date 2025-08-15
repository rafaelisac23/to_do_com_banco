import express from "express";
import { addTodoschema } from "../types/todoTypes/addTodoType";
import { db } from "../libs/prisma";
import {
  createTodo,
  DeleteById,
  GetTodoById,
  GetTodos,
  updateTodo,
} from "../services/todo";
import {
  AlterTodoschema,
  type AlterTodoType,
} from "../types/todoTypes/alterTodoType";
import { IdSchema } from "../types/IdType/Idtype";
import { toPrismaUpdateInput } from "../helpers/ConvertTypesToPrisma/convertUpdateTypetoPrisma";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    teste: "ok",
  });
});

// adcionar todo
router.post("/todo", async (req, res, next) => {
  try {
    //faz a verificação dos dados do zod
    const result = addTodoschema.parse(req.body);

    const json = await createTodo(result);

    res.json({ sucess: true, data: json });
  } catch (error) {
    next(error);
  }
});

//pegar todos os todos
router.get("/todos", async (req, res, next) => {
  const { page } = req.query;

  try {
    const result = await GetTodos(parseInt(page as string));

    res.status(200).json({
      success: true,
      result: result,
    });
  } catch (err) {
    next(err);
  }
});

//Pegar por id
router.get("/todo/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const numid = IdSchema.parse(parseInt(id));
    const data = await GetTodoById(numid);

    console.log(numid);

    if (!data) {
      res.status(404).json({ error: "Data not found" });
    }

    res.json({ result: data });
  } catch (err) {
    next(err);
  }
});

router.put("/todo/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data: AlterTodoType = req.body;
    const numid = IdSchema.parse(parseInt(id));
    //Verifica com o zod se os dados recebidos são iguais ao do schema do zod
    const dataobject = AlterTodoschema.parse(data);

    //converte os dado que foram verificados pelo zod para o tipo do Prisma
    const prismaData = toPrismaUpdateInput(dataobject);

    const result = await updateTodo(numid, prismaData);

    res.json({ success: true, result: data });
  } catch (err) {
    next(err);
  }
});

//Delete
router.delete("/todo/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = Number(id);

    if (!Number.isInteger(numId)) {
      throw new Error("Id is not valid value");
    }

    const result = await DeleteById(numId);

    if (!result) {
      throw new Error("Valor não encontrado");
    }

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

export default router;
