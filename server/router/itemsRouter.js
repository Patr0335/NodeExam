import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/api/items", async (req, res) => {
  const items = await db.all("SELECT * FROM items;");

  res.send(items);
});

// router.post("/api/items", async (req, res) => {
//   const items = await db.all("INSERT INTO items VALUES (?, ?, ?);")
// })

export default router;


