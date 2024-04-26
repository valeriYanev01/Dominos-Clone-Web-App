import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  doorBell: {
    type: String,
  },
  floor: {
    type: String,
  },
  block: {
    type: String,
  },
  apartment: {
    type: String,
  },
  entrance: {
    type: String,
  },
});

const userSchema = new mongoose.Schema(
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
    addresses: [addressSchema],
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password, confirmPassword, firstName, lastName, img) {
  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  if (!confirmPassword) {
    throw new Error("Confirm password is required");
  }

  if (!firstName) {
    throw new Error("First name is required");
  }

  if (!lastName) {
    throw new Error("Last name is required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
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
    throw new Error("Password needs to be at least 8 characters with at least 1 number.");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("Email already taken");
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, confirmPassword: hash, firstName, lastName, img });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Wrong credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Wrong credentials");
  }

  return user;
};

userSchema.statics.updateUser = async function (
  email,
  firstName,
  lastName,
  currentPassword,
  newPassword,
  confirmNewPassword
) {
  if (!currentPassword && !newPassword && !confirmNewPassword && firstName && lastName) {
    try {
      const updatedUser = await this.findOneAndUpdate(
        { email },
        { $set: { firstName: firstName, lastName: lastName } },
        { new: true }
      );

      return updatedUser;
    } catch (err) {
      return err.message;
    }
  }

  if (currentPassword && newPassword && confirmNewPassword) {
    try {
      if (currentPassword === newPassword) {
        throw new Error("New password cannot be the same as the old password");
      }

      if (
        !validator.isStrongPassword(newPassword, {
          minLength: 8,
          minNumbers: 1,
          minLowercase: 0,
          minUppercase: 0,
          minSymbols: 0,
        })
      ) {
        throw new Error("New password needs to be at least 8 characters with at least 1 number.");
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error("New password and confirm password do not match");
      }

      const user = await this.findOne({ email });

      const passwordMatch = await bcrypt.compare(currentPassword, user.password);

      if (!passwordMatch) {
        throw new Error("Old password is wrong");
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(newPassword, salt);

      const updatedUser = await this.findOneAndUpdate({ email }, { $set: { password: hash } }, { new: true });

      return updatedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  } else {
    throw new Error("All password fields required to update the password");
  }
};

userSchema.statics.addAddress = async function (
  email,
  name,
  streetName,
  streetNumber,
  postCode,
  municipality,
  phoneNumber,
  doorBell = "",
  floor = "",
  block = "",
  apartment = "",
  entrance = ""
) {
  if (!name) {
    throw new Error("Enter a name for this address");
  }

  if (!streetName) {
    throw new Error("Enter a street name");
  }

  if (!streetNumber) {
    throw new Error("Enter a street number");
  }

  if (!postCode) {
    throw new Error("Enter a post code");
  }

  if (!municipality) {
    throw new Error("Enter a municipality");
  }

  if (!phoneNumber) {
    throw new Error("Enter a phone number");
  }

  try {
    const newAddress = await this.findOneAndUpdate(
      { email },
      {
        $push: {
          addresses: {
            name,
            streetName,
            streetNumber,
            postCode,
            municipality,
            phoneNumber,
            doorBell,
            floor,
            block,
            apartment,
            entrance,
          },
        },
      },
      { new: true }
    );

    return newAddress;
  } catch (err) {
    throw new Error(err);
  }
};

export const UserModel = mongoose.model("User", userSchema);
