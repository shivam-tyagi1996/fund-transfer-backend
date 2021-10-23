import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // error handler
  res.status(400).send({
    message: "Error Occured.",
    data: err,
    timeStamp: new Date(),
  });
};
