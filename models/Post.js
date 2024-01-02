import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    spotliteCheck: {
      type: Boolean,
      default: false,
    },
    healthCheck: {
      type: Boolean,
      default: false,
    },
    categoriesCheck: {
      type: Boolean,
      default: false,
    },
    featuredCheck: {
      type: Boolean,
      default: false,
    },
    editorPick: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    likeCheck: {
      type: Boolean,
      default: false
    },
    likers: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);



const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
