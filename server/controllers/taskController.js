const db = require('../config/db');

exports.getAllTasks = (req, res) => {
    const userId = req.user.userId;
    db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.json(results);
    });
};

exports.createTask = (req, res) => {
    const { title, description, priority, status } = req.body;
    const userId = req.user.userId;
    const query = 'INSERT INTO tasks (title, description, priority, status, user_id) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [title, description, priority, status, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Task created successfully', id: result.insertId });
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;
    const query = 'UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE id = ? AND user_id = ?';

    db.query(query, [title, description, priority, status, id, req.user.userId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Task updated successfully' });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';

    db.query(query, [id, req.user.userId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
};