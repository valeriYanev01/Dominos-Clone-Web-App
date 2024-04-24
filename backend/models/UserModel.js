import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (email, password, confirmPassword, firstName, lastName, img) {
  if (!email) {
    throw Error("Email is required");
  }

  if (!password) {
    throw Error("Password is required");
  }

  if (!confirmPassword) {
    throw Error("Confirm password is required");
  }

  if (!firstName) {
    throw Error("First name is required");
  }

  if (!lastName) {
    throw Error("Last name is required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (password !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 0,
      minUppercase: 0,
      minSymbols: 0,
    })
  ) {
    throw Error("Password needs to be at least 8 characters with at least 1 number.");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error("Email already taken");
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, confirmPassword: hash, firstName, lastName, img });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Wrong credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error("Wrong credentials");
  }

  return user;
};

export const UserModel = mongoose.model("User", UserSchema);
