import db from "./createConnection.js";
import bcrypt from "bcrypt";

const isInDeleteMode = true;
const saltRounds = 12;
const admin = await bcrypt.hash("1234", saltRounds);

if(isInDeleteMode) {
    await db.exec(`DROP TABLE IF EXISTS users;`);
    await db.exec(`DROP TABLE IF EXISTS diclasses;`);
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

// seed
if(isInDeleteMode) {
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Barbarian')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('DemonHunter')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Wizard', 75, 'Reeeeee')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Necromancer')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Monk')`);
    await db.run(`INSERT INTO classes (class, imagePath) VALUES ('Crusader')`);

    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Helm of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Shoulders of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Chest of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Bracers of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Gloves of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Belt of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Legs of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Shoes of KEA, Rare, ')`);
    await db.run(`INSERT INTO items (name, grade, imagePath) VALUES ('Ring of KEA, Rare, ')`);

    await db.run(`INSERT INTO users (username, password) VALUES ('patrickherfolge@gmail.com', '${admin}')`);
    

};

db.close();