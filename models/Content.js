import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContentSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        description1: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        content1: {
            type: String,
            required: true,
        },
        about:{
            type:Object,
            required:true
        },
    },
    { timestamps: true }
);

const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);

export default Content;
