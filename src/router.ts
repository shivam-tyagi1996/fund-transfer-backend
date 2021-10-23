import { Router } from "express";

import { Account } from "./controller";

const router = Router();
const account = Account.getInstance();

router.route("/getAccountDetails").get(account.getAccountDetails);

router.route("/getAccountList").get(account.getAccountList);

router.route("/transfer").post(account.transferFunds);

export default router;
