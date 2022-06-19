import db from "./createConnection.js";
import bcrypt from "bcrypt";

const isInDeleteMode = true;
const saltRounds = 12;
const admin = await bcrypt.hash("1234", saltRounds);

if (isInDeleteMode) {
  await db.exec(`DROP TABLE IF EXISTS users;`);
  await db.exec(`DROP TABLE IF EXISTS classes;`);
  await db.exec(`DROP TABLE IF EXISTS items;`);
  await db.exec(`DROP TABLE IF EXISTS characters;`);
}

await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(80),
    password VARCHAR(150)
    
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class VARCHAR(80),
    imagePath VARCHAR(120)
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(80),
    grade VARCHAR(80),
    imagePath VARCHAR(120)
);`);

//relationship - many to many
await db.exec(`CREATE TABLE IF NOT EXISTS charactersitems (
    characterId INTEGER,
    itemId INTEGER,
    slotId INTEGER,
    FOREIGN KEY(characterId) REFERENCES characters(id),
    FOREIGN KEY(itemId) REFERENCES items(id)
    FOREIGN KEY(slotId) REFERENCES slots(id)
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(80)
);`);

await db.exec(`CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user INTEGER,
    name VARCHAR(80),
    class INTEGER,
    FOREIGN KEY(class) REFERENCES classes(id)
);`);

// seed
if (isInDeleteMode) {
  await db.run(
    `INSERT INTO classes (class, imagePath) VALUES ('Barbarian', './images/Barbarian.png')`
  );
  await db.run(
    `INSERT INTO classes (class, imagePath) VALUES ('Demon Hunter', './images/DemonHunter.png')`
  );
  await db.run(
    `INSERT INTO classes (class, imagePath) VALUES ('Wizard', './images/Wizard.png')`
  );
  await db.run(
    `INSERT INTO classes (class, imagePath) VALUES ('Necromancer', './images/Necromancer.png')`
  );
  await db.run(
    `INSERT INTO classes (class, imagePath) VALUES ('Monk', './images/Monk.png')`
  );
  await db.run(
    `INSERT INTO classes (class, imagePath) VALUES ('Crusader', './images/Crusader.png')`
  );

  await db.run(
    `INSERT INTO items (name, grade, imagePath) VALUES ('Helm of KEA', 'Rare', './images/BarbarianHelm.jpg')`
  );
  await db.run(
    `INSERT INTO items (name, grade, imagePath) VALUES ('Shoulders of KEA', 'Rare', './images/BarbarianShoulders.jpg')`
  );
  await db.run(
    `INSERT INTO items (name, grade, imagePath) VALUES ('Chest of KEA', 'Rare', './images/BarbarianChest.jpg')`
  );
  await db.run(
    `INSERT INTO items (name, grade, imagePath) VALUES ('Legs of KEA', 'Rare', './images/BarbarianLegs.jpg')`
  );
  await db.run(
    `INSERT INTO items (name, grade, imagePath) VALUES ('OffHand of KEA', 'Rare', './images/BarbarianOffHand.jpg')`
  );
  await db.run(
    `INSERT INTO items (name, grade, imagePath) VALUES ('Weapon of KEA', 'Rare', './images/BarbarianWeapon.jpg')`
  );

  await db.run(
    `INSERT INTO characters (user, name, class) VALUES (1, 'Kekpaw', 1)`
  );
  await db.run(
    `INSERT INTO characters (user, name, class) VALUES (2, 'Babz', 3)`
  );

  await db.run(`INSERT INTO slots (id, name)VALUES (1, 'Helm')`);
  await db.run(`INSERT INTO slots (id, name)VALUES (2, 'Shoulders')`);
  await db.run(`INSERT INTO slots (id, name)VALUES (3, 'Chest')`);
  await db.run(`INSERT INTO slots (id, name)VALUES (4, 'Legs')`);
  await db.run(`INSERT INTO slots (id, name)VALUES (5, 'OffHand')`);
  await db.run(`INSERT INTO slots (id, name)VALUES (6, 'Weapon')`);

  await db.run(`INSERT INTO charactersitems VALUES (1, 1, 1)`);
  await db.run(`INSERT INTO charactersitems VALUES (1, 2, 2)`);
  await db.run(`INSERT INTO charactersitems VALUES (1, 3, 3)`);
  await db.run(`INSERT INTO charactersitems VALUES (1, 4, 4)`);
  await db.run(`INSERT INTO charactersitems VALUES (1, 5, 5)`);
  await db.run(`INSERT INTO charactersitems VALUES (1, 6, 6)`);

  await db.run(
    `INSERT INTO users (username, password) VALUES ('patrickherfolge@gmail.com', '${admin}')`
  );
}

db.close();
