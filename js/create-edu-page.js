// Функція для декодування URI
function decodeURIComponentSafe(uri) {
    try {
        return decodeURIComponent(uri);
    } catch (e) {
        console.error('Error decoding URI:', e);
        return uri;
    }
}

// Функція для отримання назви файлу з URL
function getFileNameFromUrl(url) {
    const decodedUrl = decodeURIComponentSafe(url);
    const parts = decodedUrl.split('/');
    return parts[parts.length - 1].split('.')[0];
}

// Функція для отримання розширення файлу
function getFileExtension(fileName) {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : '';
}

// Функція для оновлення тегу <title>
function updateTitleFromFilename() {
    const fileName = getFileNameFromUrl(window.location.pathname);
    document.title = fileName || 'Офіс-менеджер'; // Значення за замовчуванням
}

updateTitleFromFilename();

const username = 'vlada-valko';
const repo = 'avgust.ua';
const rootPath = 'матеріали-навчання';
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${rootPath}`;

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

function getConfig() {
    const configElement = document.getElementById('folders-config');
    if (!configElement) {
        console.error('Element #folders-config not found');
        return { folders: {} };
    }

    try {
        const config = JSON.parse(configElement.textContent);
        if (typeof config.folders !== 'object' || config.folders === null) {
            console.warn('Config folders is not an object. Defaulting to empty object.');
            config.folders = {};
        }

        return config;
    } catch (error) {
        console.error('Error parsing config:', error);
        return { folders: {} };
    }
}

function formatFileName(fileName) {
    return fileName.replace(/^\d+\.\s*/, '');
}

function createSection() {
    const pageTitle = document.title || 'Офіс-менеджер';

    const section = document.createElement('section');

    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'education-page-banner aditional__banner';

    const bannerHeading = document.createElement('h1');
    bannerHeading.className = 'aditional__h1';
    bannerHeading.textContent = `${pageTitle} - курс "${pageTitle}"`; // Додавання тексту до заголовка

    bannerDiv.appendChild(bannerHeading);

    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'accordion-container';

    section.appendChild(bannerDiv);
    section.appendChild(accordionContainer);

    return section;
}

function processData(data) {
    const contentContainer = document.querySelector('.accordion-container');
    if (!contentContainer) {
        console.error('Element .accordion-container not found');
        return;
    }

    const config = getConfig();
    const folderConfigs = config.folders;

    // Проходимо по кожній папці в порядку, визначеному в JSON
    Object.keys(folderConfigs).forEach(folderName => {
        const normalizedFolderName = folderName.toLowerCase();
        const folder = data.find(item => item.type === 'dir' && item.name.toLowerCase() === normalizedFolderName);
        if (folder) {
            const folderUrl = `https://api.github.com/repos/${username}/${repo}/contents/${rootPath}/${folder.name}`;
            fetchWithCache(folderUrl)
                .then(files => {
                    if (folderConfigs[folderName] !== 'all') {
                        const normalizedFolderConfig = folderConfigs[folderName].map(name => name.toLowerCase());
                        files = files.filter(file => normalizedFolderConfig.includes(file.name.toLowerCase()));
                    }
                    files.sort((a, b) => a.name.localeCompare(b.name)); // Сортування файлів за назвою
                    createFolderBlock(folderName, files, folderConfigs[folderName]);
                })
                .catch(error => console.error('Error fetching files in folder:', error));
        }
    });
}

function createFolderBlock(folderName, files, folderConfig) {
    const contentContainer = document.querySelector('.accordion-container');
    if (!contentContainer) {
        console.error('Element .accordion-container not found');
        return;
    }

    const setDiv = document.createElement('div');
    setDiv.className = 'set';

    const titleLink = document.createElement('a');
    titleLink.className = 'index__our-values__carousel-title';
    titleLink.href = 'javascript:void(0);';
    titleLink.innerHTML = `${folderName} <i class="fa fa-plus"></i>`;
    titleLink.addEventListener('click', () => {
        contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
    });

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    files.forEach((file, index) => {
        setTimeout(() => createFileBlock(file, contentDiv), index * 500); // Затримка в 500ms між файлами
    });

    setDiv.appendChild(titleLink);
    setDiv.appendChild(contentDiv);
    contentContainer.appendChild(setDiv);
}

function createFileBlock(file, container) {
    const contentWrapperDiv = document.createElement('div');
    contentWrapperDiv.className = 'content-wrapper';

    const formattedFileName = formatFileName(file.name);
    const fileExtension = getFileExtension(file.name);

    const fileTitle = document.createElement('p');
    fileTitle.className = 'index__our-values__carousel-title index__our-values__carousel-title-small';

    // Створюємо елемент зображення з обробкою помилок завантаження
    const imgElement = document.createElement('img');
    imgElement.src = `../img/education/${fileExtension}.png`;
    imgElement.alt = formattedFileName;
    imgElement.onerror = () => {
        imgElement.src = '../img/education/default.png'; // Використання default.png при помилці завантаження
    };

    fileTitle.appendChild(imgElement);
    fileTitle.append(` ${formattedFileName}`);

    const contentBtnsDiv = document.createElement('div');
    contentBtnsDiv.className = 'content-btns';

    const viewButton = document.createElement('a');
    viewButton.className = 'education__buttons';
    viewButton.href = file.download_url;
    viewButton.target = '_blank';
    viewButton.textContent = 'Ознайомитись';

    const downloadButton = document.createElement('a');
    downloadButton.className = 'education__buttons';
    downloadButton.href = file.download_url;
    downloadButton.download = '';
    downloadButton.textContent = 'Завантажити';

    contentBtnsDiv.appendChild(viewButton);
    contentBtnsDiv.appendChild(downloadButton);
    contentWrapperDiv.appendChild(fileTitle);
    contentWrapperDiv.appendChild(contentBtnsDiv);
    container.appendChild(contentWrapperDiv);
}

// Завантажити дані для поточної сторінки та створити секцію
fetchWithCache(apiUrl)
    .then(data => {
        const contentContainer = document.getElementById('content-container');
        contentContainer.appendChild(createSection());
        processData(data);
    })
    .catch(error => console.error('Error fetching all data:', error));
