const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          msg: 'This email already exists',
        });
      }

      if (password.length < 5) {
        return res
          .status(400)
          .json({ msg: 'Password must be at least 5 characters long' });
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: passwordHashed,
      });

      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
      });

      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;

      if (!rf_token) {
        return res.status(400).json({ msg: 'Please Login or Register' });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: 'PLease Login or Register' });
        }
        const accessToken = createAccessToken({ id: user.id });
        res.json({ user, accessToken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  login: (req, res) => {
    res.json({ message: 'Login controller' });
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
