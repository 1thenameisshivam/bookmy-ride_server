import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message:
          "Please enter a strong password with at least 8 characters, including 1 lowercase, 1 uppercase, 1 number, and 1 symbol.",
      },
    },

    place: {
      type: String,
      required: [true, "place is required"],
    },
    type: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phNo: {
      type: String,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "any", { strictMode: true });
        },
        message: (mess) => `${mess.value} is not an valid no`,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ _id: this._id }, "bookmy-ride", {
    expiresIn: "7d",
  });
  return token;
};

export default mongoose.model("User", userSchema);
