module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;
    console.log("DATA", data);

    res.status(200).json({ message: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
