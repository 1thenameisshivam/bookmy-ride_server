export const isAdmin = async (req, res) => {
  const { type } = req.user;
  if (!type) {
    res.status(401).json({ message: "unAuthorised", status: false });
  }
  if (type != "admin") {
    res.status(401).json({ message: "unAuthorised", status: false });
  }
  res.status(200).json({ message: "admin", status: true });
};
