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
    this.database = AccountDB;
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
      temp = await this.database.findOne({ _id: req.user.id });
      data = JSON.parse(JSON.stringify(temp));

      const product = data.products.find(
        (e: any) => e.accountNumber === body.originAccount
      );
      if (!product) {
        throw new Error("Unable to find the Account.");
      }
      if (product.balance < body.amount) {
        throw new Error("Insufficient Balance.");
      }

      // Updating remaining amount in the account.
      temp = {
        ...data,
        product: data.products.map((e: any) => {
          if (e.accountNumber === body.originAccount) {
            e.balance = e.balance - body.amount;
          }
          return e;
        }),
      };
      await this.database.update({ _id: req.user.id }, temp);

      // Transferring funds (creating entry in statement)
      const result = await this.transfer(body);

      res.send(result);
    } catch (e) {
      // Re-credit the amount
      if ((e.message === "Unable to transfer funds")) {
        temp = {
          ...data,
          product: data.product.map((e: any) => {
            if (e.accountNumber === body.originAccount) {
              e.balance = e.balance + body.amount;
            }
            return e;
          }),
        };
        await this.database.update({ _id: req.user.id }, temp);
      }
      next(e.message);
    }
  };

  private async transfer(body: any, counter: number = 0): Promise<any> {
    try {
      // add funds to destination account
      let temp = await this.database.findOne({ "products.accountNumber": body.destinationAccount });
      temp = JSON.parse(JSON.stringify(temp));
      temp = {
        ...temp,
        products: temp.products.map((e: any) => {
          if (e.accountNumber === body.destinationAccount) {
            e.balance = e.balance + body.amount;
          }
          return e;
        })
      }
      await this.database.update({ _id: temp._id }, temp);

      return { message: "Transfer Successful." };
    } catch (e) {
      if (counter < 2) {                  // Retry logic
        return this.transfer(body, counter + 1);
      } else {
        throw new Error("Unable to transfer funds");
      }
    }
  }
}
