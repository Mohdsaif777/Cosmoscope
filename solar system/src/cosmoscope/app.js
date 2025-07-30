// ===== app.js =====
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_registration'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/forgot-password', (req, res) => res.render('forgot-password'));

app.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const sql = 'SELECT * FROM password_resets WHERE token = ?';
  db.query(sql, [token], (err, result) => {
    if (err) return res.status(500).send('Database error');
    if (result.length === 0) return res.status(400).send('Invalid or expired token');
    res.render('reset-password', { token });
  });
});

app.post('/register', (req, res) => {
  const { username, email, phone, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernamePart = email.split('@')[0];
  const domainPart = email.split('@')[1];
  const isOnlyDigits = /^[0-9]+$/.test(usernamePart);
  const isOnlySymbols = /^[^a-zA-Z0-9]+$/.test(usernamePart);
  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];

  if (!emailRegex.test(email) || isOnlyDigits || isOnlySymbols || !allowedDomains.includes(domainPart)) {
    return res.render('register', { error: 'Invalid or unsupported email address' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');
    const sql = 'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, phone, hashedPassword], (err) => {
      if (err) return res.status(500).send('Error registering user');
      res.redirect('/');
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err || result.length === 0) return res.status(400).send('Invalid email or password');
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).send('Invalid email or password');
      req.session.userId = result[0].id;
      res.redirect('/home');
    });
  });
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err || result.length === 0) return res.status(400).send('No user found with that email');

    const token = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;
    const insertTokenSql = 'INSERT INTO password_resets (email, token, expires) VALUES (?, ?, ?)';
    db.query(insertTokenSql, [email, token, resetTokenExpiry], (err) => {
      if (err) return res.status(500).send('Database error');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: { rejectUnauthorized: false }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `Click here to reset your password: http://localhost:3000/reset-password/${token}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send('Error sending reset email');
        res.send('Password reset email sent!');
      });
    });
  });
});

app.post('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const sql = 'SELECT * FROM password_resets WHERE token = ? AND expires > ?';
  db.query(sql, [token, Date.now()], (err, result) => {
    if (err || result.length === 0) return res.status(400).send('Invalid or expired token');
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Error hashing password');
      const updatePasswordSql = 'UPDATE users SET password = ? WHERE email = ?';
      db.query(updatePasswordSql, [hashedPassword, result[0].email], (err) => {
        if (err) return res.status(500).send('Error updating password');
        db.query('DELETE FROM password_resets WHERE token = ?', [token], (err) => {
          if (err) return res.status(500).send('Error deleting reset token');
          res.send('Password successfully reset');
        });
      });
    });
  });
});

app.get('/home', (req, res) => {
  if (!req.session.userId) return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Error logging out');
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
