function clearCache() {
    localStorage.clear();
}

const username = 'vlada-valko';
const repo = 'avgust.ua';
const rootPath = 'educational-programs';
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${rootPath}`;

// Функція для отримання даних з кешу або з API
function fetchWithCache(url) {
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
        return Promise.resolve(JSON.parse(cachedData));
    }

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem(url, JSON.stringify(data));
            return data;
        });
}

// Функція для форматування назви файлу
function formatFileName(fileName) {
    // Видалити розширення .html з назви файлу
    return fileName.replace(/\.html$/, '').replace(/^\d+\.\s*/, ''); // Видалити номер і пробіл на початку
}

// Функція для створення картки
function createCard(file) {
    // Перевірка, чи не містить файл слово "макет" у назві
    if (file.name.toLowerCase().includes('макет')) {
        return null; // Не створюємо картку
    }

    const card = document.createElement('div');
    card.classList.add('card');

    const content = document.createElement('div');
    content.classList.add('content');

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = formatFileName(file.name); // Форматування назви для заголовка

    const copy = document.createElement('p');
    copy.classList.add('copy');
    copy.textContent = 'Навчальна програма для легкого старту'; // Змініть опис за потреби

    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = 'Ознайомитись';
    // Посилання на відповідну сторінку
    const formattedFileName = formatFileName(file.name);
    button.onclick = () => window.location.href = `/educational-programs/${formattedFileName}.html`;

    content.appendChild(title);
    content.appendChild(copy);
    content.appendChild(button);
    card.appendChild(content);

    // Оновлення стилю картки
    const imageNames = [];
    const numberOfImages = 20; // Кількість зображень

    for (let i = 1; i <= numberOfImages; i++) {
        imageNames.push(`${i}.jpg`);
    }

    const basePath = '../../img/nav-edu/';
    const randomImageName = imageNames[Math.floor(Math.random() * imageNames.length)];
    const imageUrl = basePath + randomImageName;
    card.style.setProperty('--image-url', `url(${imageUrl})`);

    return card;
}

// Основна функція для генерації карток
function generateCards(data) {
    const container = document.querySelector('.page-content');
    if (!container) {
        console.error('Element .page-content not found');
        return;
    }

    data.forEach(file => {
        if (file.type === 'file' && !file.name.toLowerCase().includes('макет')) { // Додана перевірка на слово "макет"
            const card = createCard(file);
            if (card) { // Перевірка, чи створена картка
                container.appendChild(card);
            }
        } else if (file.type === 'dir') {
            fetchWithCache(`https://api.github.com/repos/${username}/${repo}/contents/${rootPath}/${file.name}`)
                .then(subFiles => {
                    subFiles.forEach(subFile => {
                        if (subFile.type === 'file' && !subFile.name.toLowerCase().includes('макет')) { // Додана перевірка на слово "макет"
                            const card = createCard(subFile);
                            if (card) { // Перевірка, чи створена картка
                                container.appendChild(card);
                            }
                        }
                    });
                })
                .catch(error => console.error('Error fetching subfolder data:', error));
        }
    });
}

// Очищення кешу та завантаження даних для поточної сторінки
clearCache(); // Очищення кешу при оновленні

fetchWithCache(apiUrl)
    .then(data => {
        generateCards(data);
    })
    .catch(error => console.error('Error fetching all data:', error));
