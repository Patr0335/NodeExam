import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/api/characters/:userid", async (req, res) => {
    let userid = req.params.userid;
    
    const characters = await db.all('SELECT * FROM characters WHERE user == '+ userid);

    res.send( characters );
});


export default router;