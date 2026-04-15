const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// جعل السيرفر يقرأ ملفات الـ CSS والـ JS تلقائياً
app.use(express.static(__dirname));

// الربط مع قاعدة البيانات
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 1. هذا الجزء يفتح موقعك (index.html) بدلاً من الرسالة القديمة
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. نقطة استقبال البيانات من ملف ens.js (POST)
app.post('/data', async (req, res) => {
  try {
    const { info } = req.body;
    // تأكد أن لديك جدول اسمه messages أو غيره حسب حاجتك
    await pool.query('INSERT INTO messages (content) VALUES ($1)', [info]);
    res.json({ status: 'success', message: 'تم حفظ البيانات في القاعدة!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
