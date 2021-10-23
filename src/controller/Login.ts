import { NextFunction, Request, Response } from "express";

export default class Login {
  static getInstance() {
    if (!Login.instance) {
      Login.instance = new Login();
    }
    return Login.instance;
  }
  static instance: Login;

  checkLogin(req: Request, res: Response, next: NextFunction) {
    // check Login
  }

  checkToken(req: any, res: Response, next: NextFunction) {
    // check Token
    req.user = { id: "6173ebe84df8c8a967f04c7f" };
    next();
  }
}
