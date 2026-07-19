import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variable ");
}

if(!process.env.JWT_SECRET) {
    throw new Error("JWT Secret is not defined in environment variable");
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("Google Client Id is not defined in environment variable");
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("Google Client secret is not defined in environment variable");
}

if(!process.env.GOOGLE_REFRESH_TOKEN){
    throw new Error("Google Refresh token is not defined in environment variable");
}

if(!process.env.GOOGLE_USER) {
    throw new Error("Google User is not defined in environment variable");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER
}

export default config;