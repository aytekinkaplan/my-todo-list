// config/session.js
import session from "express-session";
import MongoStore from "connect-mongo";

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === "production",
  },
};

export default sessionConfig;
