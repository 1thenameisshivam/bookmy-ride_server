export const signupValidation = (req) => {
  const { userName, email, password, place, phNo } = req.body;
  if (!userName || !email || !password || !place) {
    throw new Error("all fields are required");
  }
  const allowed = ["userName", "email", "password", "place", "phNo"];
  const isSignupAllowed = Object.keys(req.body).every((data) =>
    allowed.includes(data)
  );
  if (!isSignupAllowed) {
    throw new Error("mislinuous activity tracked");
  }
};
