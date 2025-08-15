import { Prisma } from "../../generated/prisma";
import type { AlterTodoType } from "../../types/todoTypes/alterTodoType";

export const toPrismaUpdateInput = (
  data: AlterTodoType
): Prisma.TodoUpdateInput => {
  const prismaData: Prisma.TodoUpdateInput = {};

  if (data.completed !== undefined) {
    prismaData.completed = { set: data.completed };
  }

  if (data.desc !== undefined) {
    prismaData.desc = { set: data.desc };
  }

  if (data.title !== undefined) {
    prismaData.title = { set: data.title };
  }

  return prismaData;
};
