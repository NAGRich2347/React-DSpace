const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Load users from users.json
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../users.json'), 'utf-8'));

/**
 * Authenticate a user by username and password.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{username: string, role: string} | null>}
 */
async function authenticate(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return null;
  return { username: user.username, role: user.role };
}

module.exports = { authenticate }; 