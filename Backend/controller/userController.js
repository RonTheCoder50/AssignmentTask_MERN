import bcrypt from "bcrypt";
import User from "../model/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

//@desc Register a user
//@route  POST /api/user/register
//@access public
export const userRegister = asyncHandler(async (req, res) => {
  //validate credintials
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be greater than or equal to 6 characters!");
  }

  //check is email exist means (user exist?)
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists with this email!");
  }

  //brcypt password & register user
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({ id: user._id, email: user.email });
  } else {
    res.status(400);
    res.send("Wrong credentials!");
  }
});

//@desc login a user & generate accessToken
//@route  POST /api/user/login
//@access public
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  //compare store hashPass with request hashPass & return accessToken.
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: email,
          name: user.name,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      },
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid!");
  }
};

export const getCurrent = async (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  }

  res.status(401);
  throw new Error("User is not authorized!");
};
