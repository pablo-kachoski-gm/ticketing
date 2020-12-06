import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  console.log("sign-out");
  res.send("hi there");
});

export { router as signoutRouter };
