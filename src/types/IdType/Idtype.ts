import z from "zod";

export const IdSchema = z.number("The 'id' parameter must be a valid number");

export type IdType = z.infer<typeof IdSchema>;
