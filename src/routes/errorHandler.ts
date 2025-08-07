import type { ErrorRequestHandler, RequestHandler } from "express";

export const noFoundRequest: RequestHandler = (req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "Ocorreu um erro" });
};
