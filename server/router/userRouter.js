import { Router } from "express";
import db from "../database/createConnection.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 12;
const router = Router();

// Login
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body; // object destructuring - body must contain username and password variables (lefthand side of = req.body)
  const userFound = await db.get("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  if (!userFound) {
    res.status(400);
    return res.send("User doesnt exist");
  }

  const samePass = await bcrypt.compare(password, userFound.password);
  if (req.session.loggedIn) {
    // logged in return user
    req.session.username = username; // assigns username to session
    return res.json({
      username: userFound.username,
      id: userFound.id,
      isAdmin: userFound.isAdmin,
    });
  } else if (samePass && !req.session.loggedIn) {
    // if not logged in & wrote correct user it logs in
    req.session.loggedIn = true;
    req.session.username = username;
    return res.json({
      username: userFound.username,
      id: userFound.id,
      isAdmin: userFound.isAdmin,
    });
  } else {
    res.status(401);
    return res.send("you messed up");
  }
});

// Signup
router.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  const sameUser = await db.get("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  if (sameUser) {
    return res.status(400).send("There is already a user with that email");
  }

  const hashedPass = await bcrypt.hash(password, saltRounds);

  //db.run returns object with property changes that I destucture.
  const { changes } = await db.run(
    `INSERT INTO users (username, password, isAdmin) VALUES (?, ?, false)`,
    [username, hashedPass]
  );

  if (changes === 1) {
    welcomeMail(username);
    return res.send("Signup successful");
  }

  res.send("Signup fail");
});

// Get all users for admin page
router.get("/api/users", async (req, res) => {
  if (req.session.loggedIn) {
    const users = await db.all(`SELECT * FROM users`);
    res.send(users);
  } else res.status(401).send("YOU SHALL NOT PASS");
});

// delete user
router.delete("/api/users/:id", async (req, res) => {
  await db.exec(`DELETE FROM users WHERE id = ${req.params.id}`);
  res.send("Success");
});

// update user
router.put("/api/users/:id", async (req, res) => {
  await db.get(
    `UPDATE users SET username = '${req.body.username}' WHERE id = '${req.params.id}'`
  );

  const result = await db.get(
    `SELECT * FROM users WHERE id = '${req.params.id}'`
  );
  res.send(result);
});

// Logout
router.get("/api/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false;
    req.session.username = null;
    return res.send("Logged out");
  }

  res.send("You're not logged in");
});

// Nodemailer
function welcomeMail(username) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Text = skal indeholde password
  let mailDetails = {
    from: "patricklindahl91@gmail.com",
    to: username,
    subject: "Success!!",
    html: "<p> You have sucessfully made an account on DI-Aromry! </p>",
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("");
    } else {
      console.log("Email sent successfully");
    }
  });
}

export default router;
