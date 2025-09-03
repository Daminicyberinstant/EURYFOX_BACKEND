const mongoose = require("mongoose");

const TeamMembersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Team member role is required"],
      trim: true,
      
    },
    image: {
      type: String,
      required: [true, "Team member image is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Team member description is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection: "team_members",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Index for role
TeamMembersSchema.index({ role: 1 }, { unique: true });

module.exports = mongoose.model("TeamMembers", TeamMembersSchema);
