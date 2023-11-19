const Accounts = require("./accounts.model");

const getAccounts = async (req, res) => {
  const accounts = await Accounts.find();
  res.send(accounts);
};

const addAccounts = async (req, res) => {
  const new_Account = await Accounts.create(req.body);
  res.send(new_Account);
};

const updateAccounts = async (req, res) => {
  const updated_Acc = await Accounts.findOneAndUpdate(req.params.id, req.body);
  res.send(updated_Acc);
};

const deleteAccounts = async (req, res) => {
  const _id = req.params.id;
  await Accounts.findOneAndRemove(_id);
  res.send(`account id ${_id} was deleted`);
};

module.exports = {
  getAccounts,
  addAccounts,
  updateAccounts,
  deleteAccounts,
};
