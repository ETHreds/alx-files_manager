#!/usr/bin/node

const dbClient = require('../utils/db');
const sha1 = require('sha1');

async function postNew(req, res) {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  try {
    // Check if email already exists in the database
    const existingUser = await dbClient.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Create new user object
    const newUser = {
      email: email,
      password: hashedPassword
    };

    // Save the new user to the database
    const savedUser = await dbClient.createUser(newUser);

    // Respond with the new user's email and ID
    res.status(201).json({ email: savedUser.email, id: savedUser._id });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createUser
};
