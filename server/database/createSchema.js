import db from "./createConnection.js";
import bcrypt from "bcrypt";

const isInDeleteMode = true;
const saltRounds = 12;
const admin = await bcrypt.hash("1234", saltRounds);

if(isInDeleteMode) {
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

await db.exec(`CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user INTEGER,
    name VARCHAR(80),
    class INTEGER,
    helmSlot INTEGER,
    shoulderSlot INTEGER,
    chestSlot INTEGER,
    legsSlot INTEGER,
    offhandSlot INTEGER,
    weaponSlot INTEGER
    
);`);

// seed
if(isInDeleteMode) {
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Barbarian', './images/Barbarian.png')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Demon Hunter', './images/DemonHunter.png')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Wizard', './images/Wizard.png')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Necromancer', './images/Necromancer.png')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Monk', './images/Monk.png')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Crusader', './images/Crusader.png')`);

    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Helm of KEA', 'Rare', './images/BarbarianHelm.jpg')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Shoulders of KEA', 'Rare', './images/BarbarianShoulders.jpg')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Chest of KEA', 'Rare', './images/BarbarianChest.jpg')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Legs of KEA', 'Rare', './images/BarbarianLegs.jpg')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('OffHand of KEA', 'Rare', './images/BarbarianOffHand.jpg')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Weapon of KEA', 'Rare', './images/BarbarianWeapon.jpg')`);


    await db.run(`INSERT INTO characters (user, name, class, helmSlot, shoulderSlot, chestSlot, legsSlot, offhandSlot, weaponSlot) VALUES (1, 'Kekpaw', 1, 1, 2, 3, 4, 5, 6)`);
    await db.run(`INSERT INTO characters (user, name, class, helmSlot, shoulderSlot, chestSlot, legsSlot, offhandSlot, weaponSlot) VALUES (2, 'Babz', 3, 1, 2, 3, 4, 5, 6)`);

    await db.run(`INSERT INTO users (username, password) VALUES ('patrickherfolge@gmail.com', '${admin}')`);
    

};

db.close();