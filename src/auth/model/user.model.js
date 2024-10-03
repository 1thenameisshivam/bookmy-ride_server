import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "username is required"],
            minLength: [3, "minimum length must be greater or equal to 3"],
            maxLength: [100, "maximum length must be lesser or equal to 100"],
            lowercase: true,
            trim: true,
            validate: {
                validator: function (value) {
                    // This ensures the string contains only alphabetic characters and spaces
                    return validator.isAlpha(value, "en-US", { ignore: " " });
                },
                message: "Username should contain only alphabetic characters",
            },
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Email is required"],
            trim: true,
            minLength: [7, "minimum length must be greater or equal to 7"],
            maxLength: [100, "maximum length must be lesser or equal to 100"],
            unique: [true, "user already registered"],
            validate: {
                validator: validator.isEmail,
                message: "Please enter a valid email",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters"],
            maxLength: [100, "maximum length must be lesser or equal to 100"],
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
            minLength: [4, "minimum length must be greater or equal to 3"],
            maxLength: [70, "maximum length must be lesser or equal to 70"],
            validate: {
                validator: function (value) {
                    // This ensures the string contains only alphabetic characters and spaces
                    return validator.isAlpha(value, "en-US", { ignore: " " });
                },
                message: "place should contain only alphabetic characters",
            },
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
                    return validator.isMobilePhone(value, "any", {
                        strictMode: true,
                    });
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

const User = mongoose.model("User", userSchema);

export default User;
