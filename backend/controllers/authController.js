const db = require('../config/db');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = users[0];

        
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate Token
        const token = jwt.sign({ id: user.user_id }, 'secret_key_123', { expiresIn: '1h' });

        res.json({ 
            message: 'Login successful',
            token, 
            user: { email: user.email } 
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };