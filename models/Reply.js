import mongoose from "mongoose";

const { Schema } = mongoose;

const ReplySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    replyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      required: true,
    },
    likereply: {
      type: Boolean,
      default: false
    },
    likes: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true }
);

const Reply = mongoose.models.Reply || mongoose.model("Reply", ReplySchema);

export default Reply;
