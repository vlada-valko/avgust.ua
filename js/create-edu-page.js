const apiUrl1 = 'https://api.github.com/repos/vlada-valko/avgust.ua/contents/documents/education/офіс-менеджер';

fetch(apiUrl1, {
    headers: {
        'Authorization': `token YOUR_GITHUB_TOKEN`
    }
})
    .then(response => {
        console.log('Rate limit headers:', {
            limit: response.headers.get('X-RateLimit-Limit'),
            remaining: response.headers.get('X-RateLimit-Remaining'),
            reset: response.headers.get('X-RateLimit-Reset')
        });
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);
    })
    .catch(error => console.error('Error:', error));


const username = 'vlada-valko';
const repo = 'avgust.ua';



function getCurrentFilePath() {
    const path = window.location.pathname; // Отримати шлях поточної URL
    const fileName = path.substring(path.lastIndexOf('/') + 1); // Видобути ім'я файлу
    return decodeURIComponent(fileName.split('.')[0].toLowerCase()); // Видалити розширення, декодувати і перевести в нижній регістр
}

const fileName = getCurrentFilePath();
const rootPath = `documents/education/${fileName}`;
console.log(rootPath);

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

fetchWithCache(apiUrl)
    .then(items => {
        const folders = items.filter(item => item.type === 'dir');
        folders.forEach(folder => {
            const folderApiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${rootPath}/${folder.name}`;
            fetchFilesForFolder(folderApiUrl, folder.name);
        });
    })
    .catch(error => console.error('Error fetching folders:', error));

function fetchFilesForFolder(apiUrl, folderName) {
    fetchWithCache(apiUrl)
        .then(files => {
            createFolderBlock(folderName, files);
        })
        .catch(error => console.error('Error fetching files:', error));
}

function createFolderBlock(folderName, files) {
    const contentContainer = document.querySelector('.accordion-container');

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

    files.forEach(file => {
        if (file.type === 'file') {
            const contentWrapperDiv = document.createElement('div');
            contentWrapperDiv.className = 'content-wrapper';

            const fileTitle = document.createElement('p');
            fileTitle.className = 'index__our-values__carousel-title index__our-values__carousel-title-small';
            fileTitle.innerHTML = `<img src="" alt="">${file.name}`;

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
            contentDiv.appendChild(contentWrapperDiv);
        }
    });

    setDiv.appendChild(titleLink);
    setDiv.appendChild(contentDiv);
    contentContainer.appendChild(setDiv);
}
