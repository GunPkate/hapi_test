const { model, Schema } = require("mongoose");

const mdbUserSchema = new Schema(
  {
    username: { type: String, required: true },
    birth_year: { type: Number, required: true },
    role: { type: String, default: "member", enum: ["admin", "member"] },
  },
  { collection: "user" }
);

const mdbUser = model("user", mdbUserSchema);

module.exports = mdbUser;
