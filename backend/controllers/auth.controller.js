import bcrypt from "bcryptjs";

import User from "./../models/user.model.js";
import generateTokenAndSetToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.staus(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.staus(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const boyProfilePic =
      "https://pngtree.com/freepng/man-avatar-image-for-profile_13001882.html";
    // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const girlProfilePic =
      "https://favpng.com/png_view/3d-woman-avatar-stylized-cartoon-woman-avatar-with-glasses-png/g0FutwYY";

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.staus(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send({ login: "login" });
};

export const logout = (req, res) => {
  res.send({ logout: "logout" });
};
