import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import cryptoRandomString from "crypto-random-string";
import nodemailer from "nodemailer";
import * as crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const MY_EMAIL = process.env.MY_EMAIL;
const APP_EMAIL = process.env.APP_EMAIL;
const GOOGLE_AUTH_PASS = process.env.GOOGLE_AUTH_PASS;

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
  store: {
    type: String,
  },
  phoneNumber: {
    type: String,
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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  modifications: [
    {
      added: [String],
      removed: [String],
    },
  ],
  price: {
    type: String,
  },
  crust: {
    type: String,
  },
  size: {
    type: String,
  },
});

const invoicesSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  companyActivity: {
    type: String,
  },
  companyVAT: {
    type: String,
  },
  companyOwner: {
    type: String,
  },
});

const ordersSchema = new mongoose.Schema(
  {
    products: [productSchema],
    address: {
      type: addressSchema,
      required: false,
    },
    store: {
      type: String,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    floor: {
      type: String,
    },
    doorBell: {
      type: String,
    },
    comments: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    invoice: {
      type: [invoicesSchema],
    },
    orderType: {
      type: String,
    },
    finalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const consentSchema = new mongoose.Schema({
  delivery: {
    type: String,
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

const couponsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    validity: {
      type: Number,
    },
    used: {
      type: Boolean,
    },
    expired: {
      type: Boolean,
    },
    usedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

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
    more: {
      type: Number,
    },
    addresses: [addressSchema],
    orders: [ordersSchema],
    consents: [consentSchema],
    coupons: [couponsSchema],
    invoices: [invoicesSchema],
    paymentMethods: {
      type: [String],
    },
    stripeCustomerID: {
      type: String,
    },
    activeOrder: {
      isActive: {
        type: Boolean,
      },
      start: {
        type: Number,
      },
      finish: {
        type: Number,
      },
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpireDate: {
      type: Date,
    },
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
  addresses,
  orders,
  consents,
  coupons,
  more,
  invoices
) {
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
    firstName,
    lastName,
    img,
    addresses,
    orders,
    consents,
    coupons,
    more,
    invoices,
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
  store,
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
            store,
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
  store,
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
          "addresses.$.store": store,
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

userSchema.statics.googleLogin = async function (
  email,
  firstName,
  lastName,
  img,
  password,
  addresses = [],
  orders = [],
  consents = [],
  coupons = [],
  more = 0
) {
  password = cryptoRandomString({ length: 30, type: "ascii-printable" });

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.findOne({ email });

  if (user) {
    return user;
  } else {
    const newUser = await this.create({
      email,
      password: hash,
      firstName,
      lastName,
      img,
      addresses,
      orders,
      consents,
      coupons: Array.isArray(coupons) ? coupons : [],
      more: Number(more),
    });

    return newUser;
  }
};

userSchema.statics.newOrder = async function (
  email,
  products,
  address,
  store,
  deliveryTime,
  phoneNumber = "",
  floor,
  doorBell,
  comments,
  paymentMethod,
  invoice,
  finalPrice,
  orderType = "",
  start = 0,
  finish = 0
) {
  const sendEmailForSuccessfulOrder = async () => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: APP_EMAIL,
        pass: GOOGLE_AUTH_PASS,
      },
    });

    const mailOptionsForMe = {
      from: "dominos.clone01@gmail.com",
      to: "valeri.t.yanev@gmail.com",
      subject: `${orderType === "delivery" ? `Delivery for ${address.fullAddress}.` : `Carry Out for ${store}`}`,
      text: `
         ${
           orderType === "delivery"
             ? `
            Address: ${address.fullAddress},
            Time: ${deliveryTime},
            ${products
              .map((product) => {
                return `
                Name: ${product.name}, 
                Quantity: ${product.quantity},
                  ${
                    product.addedToppings || product.removedToppings
                      ? `Modification: 
                Added: ${product.addedToppings.join(", ")},
                Removed: ${product.removedToppings.join(", ")}
            `
                      : ""
                  }`;
              })
              .join("\n")}
            Price: ${finalPrice.toFixed(2)},
            Phone Number: ${phoneNumber}
            Floor: ${floor},
            Door Bell: ${doorBell},
            Comments: ${comments},
            Payment Method: ${paymentMethod},
            ${
              invoice
                ? `Invoice: 
              Name: ${invoice.companyName}
              Address: ${invoice.companyAddress}
              Activity: ${invoice.companyActivity}
              VAT: ${invoice.companyVAT}
              Owner: ${invoice.companyOwner}
              `
                : ""
            }
              `
             : `
              Store: ${store},
              Time: ${deliveryTime},
               ${products
                 .map((product) => {
                   return `
                Name: ${product.name}, 
                Quantity: ${product.quantity},
                  ${
                    product.addedToppings || product.removedToppings
                      ? `Modification: 
                Added: ${product.addedToppings.join(", ")},
                Removed: ${product.removedToppings.join(", ")}
            `
                      : ""
                  }`;
                 })
                 .join("\n")}
              Price: ${finalPrice.toFixed(2)},
              Payment Method: ${paymentMethod}
               ${
                 invoice
                   ? `Invoice: 
              Name: ${invoice.companyName}
              Address: ${invoice.companyAddress}
              Activity: ${invoice.companyActivity}
              VAT: ${invoice.companyVAT}
              Owner: ${invoice.companyOwner}
              `
                   : ""
               }
             `
         }
    `,
    };

    const mailOptionsForOrderer = {
      from: "dominos.clone01@gmail.com",
      to: email,
      subject: `Order - Successful`,
      text: `
      Hello,

      You successfully create order for ${
        orderType === "delivery" ? `delivery to ${address.fullAddress} ` : `pickint at ${store}`
      } for ${deliveryTime}.

      Your Order: 
        Products: 
    ${products
      .map((product) => {
        return `
      Name: ${product.name}, 
      Quantity: ${product.quantity},
      ${
        product.addedToppings || product.removedToppings
          ? `Modification: 
              Added: ${product.addedToppings.join(", ")},
              Removed: ${product.removedToppings.join(", ")}
            `
          : ""
      }`;
      })
      .join("\n")}
        Price: ${finalPrice.toFixed(2)}
          ${
            invoice
              ? `Invoice: 
              Name: ${invoice.companyName}
              Address: ${invoice.companyAddress}
              Activity: ${invoice.companyActivity}
              VAT: ${invoice.companyVAT}
              Owner: ${invoice.companyOwner}
              `
              : ""
          }
      Br!
    `,
    };

    try {
      transporter.sendMail(mailOptionsForMe, (error) => {
        if (error) {
          return res.status(500).json({ success: false, message: "Failed to send email" });
        }

        return res.status(200).json({ success: true });
      });

      if (email) {
        transporter.sendMail(mailOptionsForOrderer, (error) => {
          if (error) {
            return res.status(500).json({ success: false, message: "Failed to send email" });
          }

          return res.status(200).json({ success: true });
        });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const productObjects = products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      modifications: {
        added: product.addedToppings,
        removed: product.removedToppings,
      },
      crust: product.crust,
      size: product.size,
    }));

    user.orders.push({
      orderType,
      products: productObjects,
      address,
      store,
      deliveryTime,
      phoneNumber,
      floor,
      doorBell,
      comments,
      paymentMethod,
      invoice,
      finalPrice,
    });

    user.activeOrder.isActive = true;
    user.activeOrder.start = start;
    user.activeOrder.finish = finish;

    user.more += 1;

    const updatedUser = await user.save();

    sendEmailForSuccessfulOrder();

    return updatedUser;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.statics.addCoupon = async function (email, coupon, validity, used, usedDate) {
  try {
    const user = await this.findOneAndUpdate(
      { email },
      {
        $push: {
          coupons: {
            name: coupon,
            validity: validity,
            used: used,
            usedDate: usedDate,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.statics.newInvoice = async function (
  email,
  companyName,
  companyAddress,
  companyActivity,
  companyVAT,
  companyOwner
) {
  if (!companyName || !companyAddress || !companyActivity || !companyVAT || !companyOwner) {
    throw new Error("All fields required");
  }

  const allInvoices = await this.findOne({ email }).select("invoices");

  const companyExists = allInvoices.invoices.some((invoice) => invoice.companyVAT === companyVAT);

  if (companyExists) throw new Error("Comapny with that VAT already exists");

  try {
    const user = await this.findOneAndUpdate(
      { email },
      {
        $push: {
          invoices: {
            companyName,
            companyAddress,
            companyActivity,
            companyVAT,
            companyOwner,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

userSchema.statics.updateInvoice = async function (
  email,
  companyName,
  companyAddress,
  companyActivity,
  companyVAT,
  companyOwner
) {
  if (!email) {
    throw new Error("Unauthorized request");
  }

  if (!companyName || !companyAddress || !companyActivity || !companyVAT || !companyOwner) {
    throw new Error("All fields required");
  }

  try {
    const updatedInvoice = await this.findOneAndUpdate(
      { email, "invoices.companyVAT": companyVAT },
      {
        $set: {
          "invoices.$.companyName": companyName,
          "invoices.$.companyAddress": companyAddress,
          "invoices.$.companyActivity": companyActivity,
          "invoices.$.companyVAT": companyVAT,
          "invoices.$.companyOwner": companyOwner,
        },
      },
      { new: true }
    );

    return updatedInvoice;
  } catch (err) {
    throw new Error(err.message);
  }
};

userSchema.statics.updateCouponUsed = async function (email, _id) {
  const objectId = new mongoose.Types.ObjectId(_id);

  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await this.findOneAndUpdate(
      { email, "coupons._id": objectId },
      { $set: { "coupons.$.used": true } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Coupon not found");
    }

    return updatedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

userSchema.statics.updateCouponExpired = async function (email, _id) {
  const objectId = new mongoose.Types.ObjectId(_id);

  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await this.findOneAndUpdate(
      { email, "coupons._id": objectId },
      { $set: { "coupons.$.expired": true } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Coupon not found");
    }

    return updatedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

userSchema.statics.forgotPassword = async function (email) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpireDate = Date.now() + 3600000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: APP_EMAIL,
        pass: GOOGLE_AUTH_PASS,
      },
    });

    const mailOptions = {
      from: APP_EMAIL,
      to: MY_EMAIL,
      subject: "Password Reset",
      text: `Click to reset Password: http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, _) => {
      if (error) {
        throw new Error("Failed to send email");
      }
    });

    const updatedUser = await user.save();

    return updatedUser;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.statics.verifyPasswordResetToken = async function (token) {
  try {
    const user = await this.findOne({ resetPasswordToken: token });

    if (!user) {
      throw new Error("Invalid Token");
    }

    if (user.resetPasswordTokenExpireDate < Date.now()) {
      throw new Error("Token has expired");
    }

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

userSchema.statics.resetPassword = async function (password, confirmPassword, token) {
  if (!password || !confirmPassword) {
    throw new Error("All fields required");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const user = await this.findOne({ resetPasswordToken: token });

    if (!user) {
      throw new Error("Invalid Token");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpireDate = undefined;

    const updatedUser = await user.save();

    return updatedUser;
  } catch (err) {
    throw new Error(err);
  }
};

export const UserModel = mongoose.model("User", userSchema);
