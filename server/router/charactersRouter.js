import { Router } from "express";
import db from "../database/createConnection.js";
import { getIO } from "../socket.js";

const router = Router();

router.get("/api/characters/:userid", async (req, res) => {
  let userid = req.params.userid;
  const char = await getCharacter(userid);
  res.send(char);
});

router.get("/api/characters", async (req, res) => {
  const characters = await db.all("SELECT * FROM characters");
  res.send(characters);
});

// updater my charactersitems relationship table
router.patch("/api/characters/:characterid", async (req, res) => {
  const charactersitems = req.body;

  const hasItem = await db.get(
    `SELECT EXISTS (SELECT 1 FROM charactersitems WHERE slotId = ${charactersitems.slotId} AND characterId = ${req.params.characterid})`
  );
  if (Object.values(hasItem)[0] === 1) {
    await db.run(`UPDATE charactersitems 
    SET itemId = ${charactersitems.itemId} 
    WHERE slotId = ${charactersitems.slotId}
    AND characterId = ${req.params.characterid}`);
  } else {
    await db.run(
      `INSERT INTO charactersitems VALUES (${req.params.characterid}, ${charactersitems.itemId}, ${charactersitems.slotId})`
    );
  }
  //Getting my char again after my update.
  const char = await getCharacter(req.params.characterid);

  // update char through socket.io
  const io = getIO();
  io.emit("character", char);
  res.send(charactersitems);
});

router.post("/api/characters", async (req, res) => {
  const userId = req.session.id;
  const createCharacter = await db.run(
    `INSERT INTO characters(user, name, class) VALUES (?,?,?)`,
    userId,
    req.body.name,
    req.body.classId
  );
  res.send(createCharacter);
});

// reusable function
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

  return { ...character, items, class: c };
}

export default router;
