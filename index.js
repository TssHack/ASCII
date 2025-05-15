const express = require('express');
const figlet = require('figlet');

const app = express();
const port = 3000;

// تبدیل متن به ASCII با امکان انتخاب فونت
app.get('/', (req, res) => {
  const text = req.query.text || 'ehsan';
  const font = req.query.font;

  const options = {};
  if (font) options.font = font;

  figlet.text(text, options, (err, data) => {
    if (err || !data) {
      return res.status(500).send('خطا در تولید متن ASCII. ممکن است فونت اشتباه باشد.');
    }
    res.type('text/plain').send(data);
  });
});

// مسیر دریافت لیست فونت‌ها
app.get('/fonts', (req, res) => {
  figlet.fonts((err, fonts) => {
    if (err) {
      return res.status(500).send('خطا در دریافت لیست فونت‌ها.');
    }
    res.json(fonts);
  });
});

app.listen(port, () => {
  console.log(`سرویس اجرا شد: http://localhost:${port}`);
});
