const home = (req, res) => {
  res.render("pages/home", {
    title: "Home",
  });
};

const about = (req, res) => {
  res.render("pages/about", {
    title: "About Page",
  });
};

const login = (req, res) => {
  res.render("pages/login", {
    title: "Login",
  });
};

const signup = (req, res) => {
  res.render("pages/signup", {
    title: "Signup",
  });
};

const forgot_password = (req, res) => {
  res.render("pages/forgot_passsword", {
    title: "Forgot Password",
  });
};

module.exports = {
  home,
  about,
  login,
  signup,
  forgot_password,
};
