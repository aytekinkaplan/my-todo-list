// index.js (to export all middlewares)
export { auth } from "./auth.js";
export { default as upload } from "./multerConfig.js";
export { errorHandler } from "./errorHandler.js";
export { notFound } from "./notFound.js";
export { apiLimiter } from "./rateLimiter.js";
