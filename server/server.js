const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const authMiddleware = require('./middlewares/authMiddleware'); 
const db = require('./config/db'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); 

app.get('/api/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving tasks from database:', err);
      return res.status(500).send('Error fetching the tasks');
    }
    res.status(200).json(results);
  });
});
app.post('/api/tasks', authMiddleware, (req, res) => {
  const { title, description, priority, status } = req.body;
  
  if (!title || !description || !priority || !status) {
    return res.status(400).send('All fields are required');
  }
  const sql = 'INSERT INTO tasks (title, description, priority, status, user_id) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [title, description, priority, status, req.user], (err, result) => {
    if (err) {
      console.error('Error inserting task into database:', err);
      return res.status(500).send('Error adding the task');
    }
    res.status(201).send('Task added successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
