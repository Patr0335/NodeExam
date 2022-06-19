import { Router } from "express";
import db from "../database/createConnection.js";

const router = Router();

router.get("/api/characters/:userid", async (req, res) => {
  let userid = req.params.userid;

  const character = await db.get(`SELECT * FROM characters
    WHERE characters.id = ${userid}
    `);

    const items = await db.all(`SELECT * FROM items
    JOIN charactersitems ON items.id = itemId
    WHERE charactersitems.characterId = ${userid}
    `);


    
    const c = await db.get(`SELECT * FROM classes
    JOIN characters ON characters.class = classes.id
    WHERE characters.id = ${userid}
    `)

  res.send({...character, items, class:c});
});

router.get("/api/characters", async (req, res) => {
  const characters = await db.all("SELECT * FROM characters ");

  res.send(characters);
});

router.put("/api/characters/:characterid", async (req, res) => {

  const character = req.body;
  console.log(character)
  const updatedCharacter = await db.all(`UPDATE charactersitems 
    SET itemId = ${character.itemId} 
    WHERE slotId = ${character.slotId}
    AND characterId = ${req.params.characterid}`);

  res.send(updatedCharacter);
});



export default router;
