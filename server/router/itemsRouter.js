import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/api/items", async (req, res) => {
  if (req.session.loggedIn) {
    const items = await db.all("SELECT * FROM items;");
    res.send(items);
  } else res.status(401).send("YOU SHALL NOT PASS");
});

export default router;
