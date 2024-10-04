export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "user logged out", status: true });
  } catch (err) {
    res.status(409).json({ message: err.message, status: false });
  }
};
