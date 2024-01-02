import nodemailer from "nodemailer";
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

async function sendEmail({ to, subject, text }) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: email,
            pass,
        },
    });
    const mailOptions = {
        from: email,
        to,
        subject,
        text,
    };
    await transporter.sendMail(mailOptions);
}
export default sendEmail;