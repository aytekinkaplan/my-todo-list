import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [200, "Bio cannot be more than 200 characters"],
    },
    location: {
      type: String,
      trim: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    accountLocked: {
      type: Boolean,
      default: false,
    },
    accountLockedUntil: {
      type: Date,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for user's full name
userSchema.virtual("fullName").get(function () {
  return `${this.name}`;
});

// Index for faster querying
userSchema.index({ email: 1 });

// Pre-save hook to handle any logic before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Any additional pre-save logic can go here
  next();
});

// Instance method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password changed after a given time
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Instance method to create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

// Static method to get user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

// Plugin for Passport-Local Mongoose
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordValidator: function (password, cb) {
    if (password.length < 8) {
      return cb({ message: "Password must be at least 8 characters long" });
    }
    // Add more password validation rules as needed
    return cb(null);
  },
});

const User = mongoose.model("User", userSchema);

export default User;
