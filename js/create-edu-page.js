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
        return { folders: {} }; // Повертаємо пустий об'єкт, так як немає поля `files`
    }

    try {
        const config = JSON.parse(configElement.textContent);

        // Перевірка, чи є `folders` об'єктом
        if (typeof config.folders !== 'object' || config.folders === null) {
            console.warn('Config folders is not an object. Defaulting to empty object.');
            config.folders = {};
        }

        return config;
    } catch (error) {
        console.error('Error parsing config:', error);
        return { folders: {} }; // Повертаємо пустий об'єкт, так як немає поля `files`
    }
}

function formatFileName(fileName) {
    // Видаляємо цифри перед крапкою
    return fileName.replace(/^\d+\.\s*/, '');
}

function createSection() {
    // Створення секції
    const section = document.createElement('section');

    // Створення банера
    const bannerDiv = document.createElement('div');
    bannerDiv.className = 'education-page-banner aditional__banner';

    const bannerHeading = document.createElement('h1');
    bannerHeading.className = 'aditional__h1';

    // Отримання назви HTML-файлу
    const fileName = document.title.replace(/\.html$/, '');
    bannerHeading.textContent = `Курс: ${fileName}`;

    bannerDiv.appendChild(bannerHeading);

    // Створення контейнера для динамічного контенту
    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'accordion-container';

    // Додавання банера і контейнера в секцію
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

    // Створити карту URL-адрес для папок
    const folderApiUrls = Object.keys(folderConfigs).reduce((urls, folderName) => {
        const normalizedFolderName = folderName.toLowerCase();
        const folder = data.find(item => item.type === 'dir' && item.name.toLowerCase() === normalizedFolderName);
        if (folder) {
            urls[folderName] = `https://api.github.com/repos/${username}/${repo}/contents/${rootPath}/${folder.name}`;
        }
        return urls;
    }, {});

    // Обробка папок згідно з конфігурацією
    const folderPromises = Object.keys(folderConfigs).map(folderName => {
        const url = folderApiUrls[folderName];
        const folderConfig = folderConfigs[folderName];
        return fetchWithCache(url)
            .then(files => {
                if (folderConfig === 'all') {
                    files.sort((a, b) => a.name.localeCompare(b.name)); // Сортування файлів за назвою
                } else {
                    // Фільтрувати файли на основі конфігурації
                    const normalizedFolderConfig = folderConfig.map(name => name.toLowerCase());
                    files = files.filter(file => normalizedFolderConfig.includes(file.name.toLowerCase()));
                    files.sort((a, b) => a.name.localeCompare(b.name));
                }
                return createFolderBlock(folderName, files, folderConfig);
            })
            .catch(error => console.error('Error fetching files in folder:', error));
    });

    // Очікування обробки всіх даних
    Promise.all(folderPromises)
        .catch(error => console.error('Error processing folders:', error));
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

    // Обробка файлів на основі конфігурації
    const normalizedFolderConfig = folderConfig === 'all' ? [] : folderConfig.map(name => name.toLowerCase());
    const sortedFiles = files.filter(file => {
        return folderConfig === 'all' || normalizedFolderConfig.includes(file.name.toLowerCase());
    });
    sortedFiles.forEach((file, index) => {
        setTimeout(() => createFileBlock(file, contentDiv), index * 500); // Затримка в 500ms між файлами
    });

    setDiv.appendChild(titleLink);
    setDiv.appendChild(contentDiv);
    contentContainer.appendChild(setDiv);
}

function createFileBlock(file, container) {
    const contentWrapperDiv = document.createElement('div');
    contentWrapperDiv.className = 'content-wrapper';

    // Отримати відформатовану назву файлу
    const formattedFileName = formatFileName(file.name);

    const fileTitle = document.createElement('p');
    fileTitle.className = 'index__our-values__carousel-title index__our-values__carousel-title-small';
    fileTitle.innerHTML = `<img src="../img/education/${file.name}" alt="">${formattedFileName}`;

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
