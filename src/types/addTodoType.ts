import z from "zod";

export const addTodoschema = z.object({
  title: z.string(),
  desc: z.string(),
});

export type addTodoType = z.infer<typeof addTodoschema>;
