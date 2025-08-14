import type { ErrorRequestHandler, RequestHandler } from "express";
import { success, ZodError } from "zod";
import { Prisma } from "../generated/prisma";

export const noFoundRequest: RequestHandler = (req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //Tratamento de erro do zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Parameter error",
      error: err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  //Tratamento de erro do prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, error: "not found data value" });
    }

    return res.status(404).json({
      success: false,
      message: "Prisma Error",
      error: {
        code: err.code,
        message: err.message,
        meta: err.meta,
      },
    });
  }

  //Tratamento erro type Erro

  if (err instanceof Error) {
    res.status(404).json({ success: false, error: err.message });
  }
};
