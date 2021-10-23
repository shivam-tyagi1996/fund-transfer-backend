import { model, Schema, Types } from "mongoose";

const productSchema = new Schema({
  type: String,
  balance: Number,
  createdAt: String,
  accountNumber: String,
});

const accountSchema = new Schema({
  id: Types.ObjectId,
  name: String,
  createdAt: String,
  products: Array,
});

export default model("Account", accountSchema, "Account");
