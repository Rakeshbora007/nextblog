// about.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AboutSchema = new Schema(
    {
        author: {
            type: Boolean,
            default: false
        },
        main: {
            type: Boolean,
            default: false
        },
        teams: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;
