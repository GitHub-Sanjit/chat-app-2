export const signup = (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
  } catch (error) {}
};

export const login = (req, res) => {
  res.send({ login: "login" });
};

export const logout = (req, res) => {
  res.send({ logout: "logout" });
};
