import { Router } from "express";
import db from "../database/createConnection.js";
import { init, getIO } from "../socket.js";

const router = Router();

router.get("/api/characters/:userid", async (req, res) => {
  let userid = req.params.userid;
  const char = await getCharacter(userid);
  res.send(char);
});

router.get("/api/characters", async (req, res) => {
  const characters = await db.all("SELECT * FROM characters");
  console.log(characters);
  res.send(characters);
});

router.put("/api/characters/:characterid", async (req, res) => {
  const charactersitems = req.body;
  console.log(charactersitems);
  await db.all(`UPDATE charactersitems 
  SET itemId = ${charactersitems.itemId} 
  WHERE slotId = ${charactersitems.slotId}
  AND characterId = ${req.params.characterid}`);
  
  const char = await getCharacter(req.params.characterid);
  
  const io = getIO();
  io.emit('character', char);
  res.send(charactersitems);
});

async function getCharacter(userid) {
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
  `);

  return {...character, items, class:c}
}

export default router;
