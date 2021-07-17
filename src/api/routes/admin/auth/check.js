module.exports = async (req, res) => {
  try {
    const { accessToken } = req;

    if (accessToken) {
      return res.status(200).json({ status: 'success', meta: { accessToken } });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
};
