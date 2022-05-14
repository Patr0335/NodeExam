import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/api/classes", async (req, res) => {
    const classes = await db.all("SELECT * FROM classes;");

    res.send({ data: classes });
});


export default router;