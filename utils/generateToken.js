import crypto from "crypto";

const generateToken = () => crypto.randomBytes(20).toString('hex');

export default generateToken;