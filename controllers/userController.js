import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const loadRegister = async (req, res) => {
  try {
    res.render("registration");
  } catch (error) {
    console.error("Error in loadRegister:", error.message);
    res
      .status(500)
      .render("error", { message: "An error occurred. Please try again." });
  }
};

const insertUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
      image: req.file.filename,
      password: req.body.password,
      isAdmin: false,
      isVerified: false,
    });

    const userData = await user.save();

    if (userData) {
      res.render("registration", {
        message:
          "Your registration has been successful. Please verify your email.",
      });
    } else {
      res.render("registration", { message: "Your registration has failed." });
    }
  } catch (error) {
    console.error("Error in insertUser:", error.message);
    res
      .status(500)
      .render("registration", {
        message: "An error occurred during registration. Please try again.",
      });
  }
};

const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.error("Error in loginLoad:", error.message);
    res
      .status(500)
      .render("error", { message: "An error occurred. Please try again." });
  }
};

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.render("login", { message: "Invalid email or password." });
    }

    const passwordMatch = await userData.comparePassword(password);
    if (!passwordMatch) {
      await userData.incrementLoginAttempts();
      return res.render("login", { message: "Invalid email or password." });
    }

    if (!userData.isVerified) {
      return res.render("login", { message: "Please verify your email." });
    }

    await userData.resetLoginAttempts();
    req.session.user_id = userData._id;
    res.redirect("/todo");
  } catch (error) {
    console.error("Error in verifyLogin:", error.message);
    res
      .status(500)
      .render("login", { message: "An error occurred. Please try again." });
  }
};

const loadHome = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.error("Error in loadHome:", error.message);
    res
      .status(500)
      .render("error", { message: "An error occurred. Please try again." });
  }
};

export { loadRegister, insertUser, loginLoad, verifyLogin, loadHome };
