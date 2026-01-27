// backend/api/index.js
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Option: Hide dashboard in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).send('Not Found');
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
};