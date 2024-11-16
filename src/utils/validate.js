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

export const loginValidation = (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("all fields are requred");
  }
  const allowed = ["email", "password"];
  const isAllowed = Object.keys(req.body).every((value) =>
    allowed.includes(value)
  );
  if (!isAllowed) {
    throw new Error("Unwanted Data Received");
  }
};

export const tripValidation = (req) => {
  const {
    title,
    description,
    duration,
    startDate,
    endDate,
    destination,
    price,
    availableSeats,
    busType,
    pickup,
    drop,
    arrivalTime,
    departureTime,
    ac,
    meal,
    accommodation,
    activities,
    expertGuide,
  } = req.body;
  console.log("request Body is :->",req.body);
  if (
    !title ||
    !description ||
    !duration ||
    !startDate ||
    !endDate ||
    !destination ||
    !price ||
    !availableSeats ||
    !busType ||
    !pickup ||
    !drop ||
    !arrivalTime ||
    !departureTime ||
    !ac ||
    !meal ||
    !accommodation ||
    !activities ||
    !expertGuide
  ) {
    // console.log(title , description)
    throw new Error("all fields are required");
    // console.log("Error is :->",error);
  }
  const allowed = [
    "title",
    "description",
    "duration",
    "startDate",
    "endDate",
    "destination",
    "price",
    "availableSeats",
    "seat",
    "busType",
    "pickup",
    "drop",
    "arrivalTime",
    "departureTime",
    "ac",
    "meal",
    "accommodation",
    "activities",
    "expertGuide",
  ];
  const isAllowed = Object.keys(req.body).every((value) =>
    allowed.includes(value)
  );
  if (!isAllowed) {
    throw new Error("Unwanted Data Received");
  }
  if (!req.file) {
    throw new Error("Image is required");
  }
};
