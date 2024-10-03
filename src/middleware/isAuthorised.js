const isAuthorised = (req, res, next) => {
  try {
    if (req.user.type === "admin") {
      return next();
    }
    res
      .status(401)
      .json({ message: "Access denied. Admins only.", status: " false" });
  } catch (err) {
    res.status(401).json({ message: err.message, status: " false" });
  }
};

export default isAuthorised;
