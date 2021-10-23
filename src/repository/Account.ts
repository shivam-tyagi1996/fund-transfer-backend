import { model, Schema, Types } from "mongoose";

const productSchema = new Schema({
  id: Types.ObjectId,
  accountName: String,
  accountNumber: String,
});

const accountSchema = new Schema({
  id: Types.ObjectId,
  name: String,
  products: productSchema,
});

export default model("Account", accountSchema, "Account");
