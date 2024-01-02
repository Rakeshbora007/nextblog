import mongoose from "mongoose";

const { Schema } = mongoose;


const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.Mixed,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    socialLinks: {
      type: Schema.Types.Mixed,
    },
    description: {
      type: String,
    },
    followers: {
      type: [Object],
      default: [],
    },
    following: {
      type: Boolean,
      default: false
    },
    followedBy: {
      type: Boolean,
      default: false
    },
    followingUser: {
      type: [Object],
      default: []
    },
    saved: {
      type: Boolean,
      default: false
    },
    savedPosts: {
      type: [Object],
      default: []
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
