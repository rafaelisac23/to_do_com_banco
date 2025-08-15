import z from "zod";

export const AlterTodoschema = z
  .object({
    title: z.string().optional(),
    desc: z.string().optional(),
    completed: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Its necessary send one field",
  });

export type AlterTodoType = z.infer<typeof AlterTodoschema>;
