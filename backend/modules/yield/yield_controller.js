const yieldService = require("./yield_service");

exports.getYields = async (req, res) => {
  try {
    const data = await yieldService.getYields();
    res.json(data);
  } catch (error) {
    console.error("Unable to fetch yields:", error);
    res.status(502).json({ error: "Unable to fetch yield data" });
  }
};
