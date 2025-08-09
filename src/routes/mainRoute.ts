import express from "express";
import { addTodoschema } from "../types/addTodoType";
import { db } from "../libs/prisma";
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
    const result = addTodoschema.parse(req.body);

    const json = await db.todo.create({
      data: result,
    });

    return res.json({ sucess: true, result: json });
  } catch (error) {
    next(error);
  }
});

router.get("/todos", async (req, res, next) => {
  try {
    const json = await db.todo.findUniqueOrThrow({
      where: { id: 26 },
    });

    res.status(200).json({
      success: true,
      result: json,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
