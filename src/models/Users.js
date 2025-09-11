const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      default:""
    },
    emailAddress: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
      default:""
    },
    address: {
      type: String,
      trim: true,
      default:""
    },
  },
  {
    timestamps: true,
    collection: "users",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


UsersSchema.index({ emailAddress: 1 }, { unique: true });

module.exports = mongoose.model("Users", UsersSchema);
