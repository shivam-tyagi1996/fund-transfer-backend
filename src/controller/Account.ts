import { NextFunction, Request, Response } from "express";
import AccountDB from "../repository/Account";

export default class Account {
  static getInstance() {
    if (!Account.instance) {
      Account.instance = new Account();
    }
    return Account.instance;
  }
  static instance: Account;
  private database: any;

  private constructor() {
    this.database = new AccountDB();
  }

  getAccountDetails(req: Request, res: Response, next: NextFunction) {
    // get Account Details
  }

  getAccountList(req: Request, res: Response, next: NextFunction) {
    // get Account List
  }

  transferFunds = async (req: any, res: Response, next: NextFunction) => {
    let data: any;
    let temp: any;
    const body: any = req.body;
    try {
      // Checking if amount is available in account to transfer.
      temp = await this.database.findOne({ id: req.user.id });
      data = JSON.parse(JSON.stringify(temp));
      const product = data.product.filter(
        (e: any) => e.accountNumber === body.originAccount
      )[0];
      if (!product.length) {
        throw new Error("Unable to find the Account.");
      }
      if (product.balance < body.amount) {
        throw new Error("Insufficient Balance.");
      }

      // Updating remaining amount in the account.
      temp = {
        ...data,
        product: data.product.map((e: any) => {
          if (e.accountNumber === body.originAccount) {
            e.balance = e.balance - body.amount;
          }
          return e;
        }),
      };
      await this.database.update({ id: req.user.id }, temp);

      // Transferring funds (creating entry in statement)
      const result = await this.transfer(data);

      res.send(result);
    } catch (e) {
      // Re-credit the amount
      if ((e.message = "Unable to transfer funds")) {
        temp = {
          ...data,
          product: data.product.map((e: any) => {
            if (e.accountNumber === body.accountNumber) {
              e.balance = e.balance - body.amount;
            }
            return e;
          }),
        };
        await this.database.update({ id: req.user.id }, temp);
      }
      next(e.message);
    }
  };

  private async transfer(details: any, counter: number = 0): Promise<any> {
    try {
      // add funds to destination account
      console.log("transfer");
      throw "A";
      return { message: "Transfer Successful." };
    } catch (e) {
      console.log("Error", e, counter);
      if (counter < 2) {
        return this.transfer(details, counter + 1);
      } else {
        throw new Error("Unable to transfer funds");
      }
    }
  }
}
