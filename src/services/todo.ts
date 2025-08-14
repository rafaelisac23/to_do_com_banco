// criar todo

import type { Prisma } from "../generated/prisma";
import { db } from "../libs/prisma";
import { type addTodoType } from "../types/todoTypes/addTodoType";
import type { AlterTodoType } from "../types/todoTypes/alterTodoType";

//criar todo
export const createTodo = async (data: addTodoType) => {
  const result = await db.todo.create({
    data: data,
  });

  return result;
};

//Pegar todos os itens com paginação

export const GetTodos = async (page: number) => {
  let perPage = 3;
  let skip = (page - 1) * perPage;

  const json = await db.todo.findMany({
    skip,
    take: perPage,
  });

  return json;
};

//Pegar por id do todo

export const GetTodoById = (id: number) => {
  const result = db.todo.findUnique({
    where: { id: id },
  });

  return result;
};

export const updateTodo = (id: number, data: Prisma.TodoUpdateInput) => {
  const result = db.todo.update({
    where: { id: id },
    data: data,
  });
};

//Delete Todo
export const DeleteById = (id: number) => {
  const result = db.todo.delete({
    where: { id: id },
  });

  return result;
};
