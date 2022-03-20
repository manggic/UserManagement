const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: [true, "provide email please"],
  },
  age: {
    type: Number,
    required: true,
  },
  DOB: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
