const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please tell us your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please provide a comfirm password"],
    validate: {
      // This will only work on save
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not same!",
    },
  },
});
userSchema.pre("save", async function (next) {
  // this only run this function when password update or modified
  if (!this.isModified("password")) return next();

  //Hash password
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// const User = mongoose.model("User", userSchema);
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
// module.exports = User;
