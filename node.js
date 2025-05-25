const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let totalClicks = 0;

// Получить текущее количество кликов
app.get('/clicks', (req, res) => {
    res.json({ totalClicks: totalClicks });
});

// Добавить клик
app.post('/clicks', (req, res) => {
    totalClicks += 1;
    res.json({ totalClicks: totalClicks });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});