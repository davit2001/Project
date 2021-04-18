import * as dotenv from "dotenv";

// TODO move this data to .env file
// PORT=7894
// DATABASE_URI=mongodb://127.0.0.1:27017
// SECRET="This is the secret"
// NODE_ENV=development

dotenv.config();

const {
    PORT,
    DATABASE_URI,
    SECRET,
    NODE_ENV
} = process.env;

export default {
    port: PORT || 7894,
    databaseURL: DATABASE_URI || "mongodb+srv://Davit2001:david440787@cluster0.tgmmt.mongodb.net/Test?authSource=admin&replicaSet=atlas-rxigiy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
    secret: SECRET || "This is the secret",
    nodeEnv: NODE_ENV || "development",
}