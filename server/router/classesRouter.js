import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/api/classes", async (req, res) => {
  if (req.session.loggedIn) {
    const classes = await db.all("SELECT * FROM classes;");
    res.send(classes);
    res.status(401).send("YOU SHALL NOT PASS");
  }
});

export default router;
