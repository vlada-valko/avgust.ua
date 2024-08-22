
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
        return { folders: {}, files: [] };
    }

    return JSON.parse(configElement.textContent);
}

function formatFileName(fileName) {
    // Видаляємо цифри перед крапкою
    return fileName.replace(/^\d+\.\s*/, '');
}

function processData(data) {
    const contentContainer = document.querySelector('.accordion-container');
    if (!contentContainer) {
        console.error('Element .accordion-container not found');
        return;
    }

    const config = getConfig();
    const folderConfigs = config.folders;
    const fileNames = config.files;

    // Create a map of folder names to their API URLs
    const folderApiUrls = Object.keys(folderConfigs).reduce((urls, folderName) => {
        const folder = data.find(item => item.type === 'dir' && item.name === folderName);
        if (folder) {
            urls[folderName] = `https://api.github.com/repos/${username}/${repo}/contents/${rootPath}/${folderName}`;
        }
        return urls;
    }, {});

    // Process folders according to config
    const folderPromises = Object.keys(folderConfigs).map(folderName => {
        const url = folderApiUrls[folderName];
        const folderConfig = folderConfigs[folderName];
        return fetchWithCache(url)
            .then(files => {
                if (folderConfig === 'all') {
                    files.sort((a, b) => a.name.localeCompare(b.name)); // Sort files by name
                } else {
                    // Filter files based on config
                    files = files.filter(file => folderConfig.includes(file.name));
                    files.sort((a, b) => a.name.localeCompare(b.name));
                }
                return createFolderBlock(folderName, files, folderConfig);
            })
            .catch(error => console.error('Error fetching files in folder:', error));
    });

    // Process files that are not in any folder
    const files = data.filter(item => item.type === 'file' && fileNames.includes(item.name));
    createFileBlocks(files);

    // Wait for all folder data to be processed
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

    // Process files based on folderConfig
    const sortedFiles = folderConfig === 'all' ? files : files.filter(file => folderConfig.includes(file.name));
    sortedFiles.forEach((file, index) => {
        setTimeout(() => createFileBlock(file, contentDiv), index * 500); // 500ms delay between files
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

function createFileBlocks(files) {
    const contentContainer = document.querySelector('.accordion-container');
    if (!contentContainer) {
        console.error('Element .accordion-container not found');
        return;
    }

    files.forEach((file, index) => {
        setTimeout(() => {
            const setDiv = document.createElement('div');
            setDiv.className = 'set';

            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';

            createFileBlock(file, contentDiv);

            setDiv.appendChild(contentDiv);
            contentContainer.appendChild(setDiv);
        }, index * 500); // 500ms delay between files
    });
}

// Завантажити дані для поточної сторінки
fetchWithCache(apiUrl)
    .then(data => processData(data))
    .catch(error => console.error('Error fetching all data:', error));
