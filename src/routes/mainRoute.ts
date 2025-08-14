import express from "express";
import { addTodoschema } from "../types/todoTypes/addTodoType";
import { db } from "../libs/prisma";
import {
  createTodo,
  DeleteById,
  GetTodoById,
  GetTodos,
} from "../services/todo";
import { error } from "console";
import { success } from "zod";

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
    const numId = Number(id);

    if (!Number.isInteger(numId)) {
      throw new Error("Value is not a valid Value");
    }

    const data = await GetTodoById(parseInt(id));

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
    const data = req.body;

    res;

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
