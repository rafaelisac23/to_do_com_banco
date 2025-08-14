import z from "zod";

export const AlterTodoschema = z.object({
  title: z.string().optional(),
  desc: z.string().optional(),
  completed: z.boolean().optional(),
});

export type AlterTodoType = z.infer<typeof AlterTodoschema>;
