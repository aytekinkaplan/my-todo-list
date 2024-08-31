// notFound.js
export const notFound = (req, res, next) => {
  res.status(404).render("notFound", { message: "Page not found" });
};
