const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// الربط مع قاعدة البيانات عبر متغير البيئة الذي سنضعه في رندر
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// تجربة السيرفر: اطلب هذا الرابط من المتصفح لترى النتيجة
app.get('/', (req, res) => {
  res.send('السيرفر يعمل بنجاح!');
});

// نقطة وصول لجلب البيانات (مثال)
app.get('/get-data', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); 
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});