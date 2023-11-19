const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
