const yieldService = require("./yield_service");

exports.getYields = async (req, res) => {
  const data = await yieldService.getYields();
  res.json(data);
};
