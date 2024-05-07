import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  fullAddress: {
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
  coordinates: {
    type: [Number, Number],
  },
});

const consentSchema = new mongoose.Schema({
  delivery: {
    type: String,
    required: true,
  },

  confidentiality: {
    type: String,
  },

  termsOfUse: {
    type: String,
  },

  deals: {
    type: String,
  },

  updates: {
    type: String,
  },

  more: {
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
    consents: [consentSchema],
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  img,
  delivery,
  deals,
  updates
) {
  console.log(delivery, deals, updates);
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

  const user = await this.create({
    email,
    password: hash,
    confirmPassword: hash,
    firstName,
    lastName,
    img,
    consents: { delivery, deals, updates },
  });

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
  fullAddress,
  phoneNumber,
  doorBell = "",
  floor = "",
  block = "",
  apartment = "",
  entrance = "",
  coordinates
) {
  if (!name) {
    throw new Error("Enter a name for this address");
  }

  if (!fullAddress) {
    throw new Error("Enter a street name");
  }

  if (!phoneNumber) {
    throw new Error("Enter a phone number");
  }

  const allAddresses = await this.findOne({ email }).select("addresses");

  allAddresses.addresses.map((address) => {
    if (address.name === name) {
      throw new Error("Address name already exists");
    }
  });

  try {
    const newAddress = await this.findOneAndUpdate(
      { email },
      {
        $push: {
          addresses: {
            name,
            fullAddress,
            phoneNumber,
            doorBell,
            floor,
            block,
            apartment,
            entrance,
            coordinates,
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

userSchema.statics.updateAddress = async function (
  id,
  email,
  name,
  fullAddress,
  phoneNumber,
  doorBell = "",
  floor = "",
  block = "",
  apartment = "",
  entrance = "",
  coordinates
) {
  if (!name) {
    throw new Error("Enter a name for this address");
  }

  if (!fullAddress) {
    throw new Error("Enter a street name");
  }

  if (!phoneNumber) {
    throw new Error("Enter a phone number");
  }

  try {
    const updatedAddress = await this.findOneAndUpdate(
      { email, "addresses._id": id },
      {
        $set: {
          "addresses.$.name": name,
          "addresses.$.fullAddress": fullAddress,
          "addresses.$.phoneNumber": phoneNumber,
          "addresses.$.doorBell": doorBell,
          "addresses.$.floor": floor,
          "addresses.$.block": block,
          "addresses.$.apartment": apartment,
          "addresses.$.entrance": entrance,
          "addresses.$.coordinates": coordinates,
        },
      },
      { new: true }
    );

    return updatedAddress;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.statics.updateConsents = async function (
  email,
  delivery,
  confidentiality,
  termsOfUse,
  deals,
  updates,
  more
) {
  const updatedConsents = await this.findOneAndUpdate(
    { email },
    {
      $set: {
        "consents.$[].delivery": delivery,
        "consents.$[].confidentiality": confidentiality,
        "consents.$[].termsOfUse": termsOfUse,
        "consents.$[].deals": deals,
        "consents.$[].updates": updates,
        "consents.$[].more": more,
      },
    },
    { new: true }
  );

  return updatedConsents;
};

export const UserModel = mongoose.model("User", userSchema);
