import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/api/slots", async (req, res) => {
  const slots = await db.all("SELECT * FROM slots;");
  res.send(slots);
});

export default router;
