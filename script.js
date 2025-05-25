// Элементы DOM
const clickButton = document.getElementById('clickButton');
const totalClicksElement = document.getElementById('totalClicks');
const progressBar = document.getElementById('progressBar');
const baconImage = document.getElementById('baconImage');

// Конфигурация
const TARGET_CLICKS = 777777;
const API_URL = 'https://your-backend-api.com/clicks'; // Замените на ваш реальный API
let totalClicks = 0;
let lastUpdateTime = 0;

// Инициализация
async function init() {
    try {
        const response = await axios.get(API_URL);
        totalClicks = response.data.totalClicks;
        updateUI();
        startPolling();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        // Можно добавить fallback на localStorage, если API недоступно
    }
}

// Обновление UI
function updateUI() {
    totalClicksElement.textContent = totalClicks.toLocaleString();
    const progress = Math.min((totalClicks / TARGET_CLICKS) * 100, 100);
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress.toFixed(2)}%`;
    
    // Анимация при клике
    if (Date.now() - lastUpdateTime < 200) {
        baconImage.style.transform = 'scale(1.1)';
        setTimeout(() => {
            baconImage.style.transform = 'scale(1)';
        }, 200);
    }
}

// Отправка клика на сервер
async function sendClick() {
    try {
        lastUpdateTime = Date.now();
        const response = await axios.post(API_URL);
        totalClicks = response.data.totalClicks;
        updateUI();
    } catch (error) {
        console.error('Ошибка при отправке клика:', error);
    }
}

// Периодическая проверка обновлений
function startPolling() {
    setInterval(async () => {
        try {
            const response = await axios.get(API_URL);
            if (response.data.totalClicks > totalClicks) {
                totalClicks = response.data.totalClicks;
                updateUI();
            }
        } catch (error) {
            console.error('Ошибка при проверке обновлений:', error);
        }
    }, 5000); // Проверка каждые 5 секунд
}

// Обработчик клика
clickButton.addEventListener('click', () => {
    sendClick();
    
    // Визуальная обратная связь
    clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickButton.style.transform = 'scale(1)';
    }, 100);
});

// Запуск приложения
init();