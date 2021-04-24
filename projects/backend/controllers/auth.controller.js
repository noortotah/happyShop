const User = require("../models/user.model");

exports.register = (req, res, next) => {
  const user = new User(req.body);
  user.save().then((user) => {
    this.login(req, res);
    // res.status(200).json({
    //   success: true,
    //   user,
    // });
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ Status: "Email Not Valid" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ Status: "Password Failed" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .status(200)
          .json({
            success: true,
            user
          });
      });
    });
  });
};

exports.logout = (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      succes: true,
    });
  });
};
