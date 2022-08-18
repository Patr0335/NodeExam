import { Router } from "express"
import db from "../database/createConnection.js";

const router = Router();


router.get("/api/products", async (req, res) => {
    const products = await db.all(`SELECT * FROM products`);
    res.send(products);
  });

  export default router;