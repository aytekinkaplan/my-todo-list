import User from "../models/userModel.js";

const renderLoginPage = (response, message = null) => {
  response.render("login", message ? { message } : {});
};

const loadLogin = (request, response) => {
  renderLoginPage(response);
};

const verifyLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const userData = await User.findOne({ email });

    if (!userData || !(await userData.comparePassword(password))) {
      await userData?.incrementLoginAttempts();
      return renderLoginPage(response, "Invalid credentials");
    }

    if (!userData.isActive) {
      return renderLoginPage(
        response,
        "Account is not active. Please contact support."
      );
    }

    if (!userData.isAdmin) {
      return renderLoginPage(response, "Access denied. Admin rights required.");
    }

    await userData.resetLoginAttempts();
    request.session.user_id = userData._id;
    response.redirect("/admin/home");
  } catch (error) {
    console.error("Login error:", error);
    renderLoginPage(response, "An error occurred. Please try again.");
  }
};

const loadDashboard = (request, response) => {
  response.render("home");
};

const logout = (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    response.redirect("/admin");
  });
};

export { loadLogin, verifyLogin, loadDashboard, logout };
