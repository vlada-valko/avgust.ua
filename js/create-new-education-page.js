
const username = 'vlada-valko';
const repo = 'avgust.ua';
const githubToken = process.env.FOR_AVGUST; // Використовуємо секрет
const cacheKey = 'cache'; // Використовуйте localStorage для кешування

// Замінюємо fs з localStorage
function getCachedFolders() {
    const data = localStorage.getItem(cacheKey);
    return data ? JSON.parse(data) : [];
}

function updateCache(folders) {
    localStorage.setItem(cacheKey, JSON.stringify(folders));
}

async function fetchWithCache(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function savePage(fileName, content) {
    const url = `https://api.github.com/repos/${username}/${repo}/contents/навчання/${fileName}`;
    const data = {
        message: `Create ${fileName}`,
        content: btoa(content), // Використовуємо btoa для перетворення в base64
        branch: 'main'
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${githubToken}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.content) {
            console.log(`${fileName} was successfully created.`);
        } else {
            console.error(`Failed to create ${fileName}.`, result);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deletePage(fileName) {
    const getUrl = `https://api.github.com/repos/${username}/${repo}/contents/навчання/${fileName}`;
    const response = await fetch(getUrl, {
        headers: {
            'Authorization': `token ${githubToken}`
        }
    });
    const data = await response.json();

    const deleteUrl = `https://api.github.com/repos/${username}/${repo}/contents/навчання/${fileName}`;
    const deleteData = {
        message: `Delete ${fileName}`,
        sha: data.sha,
        branch: 'main'
    };

    try {
        const deleteResponse = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${githubToken}`
            },
            body: JSON.stringify(deleteData)
        });
        if (deleteResponse.ok) {
            console.log(`${fileName} was successfully deleted.`);
        } else {
            console.error(`Failed to delete ${fileName}.`, await deleteResponse.json());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function checkIfPageExists(fileName) {
    const url = `https://api.github.com/repos/${username}/${repo}/contents/навчання/${fileName}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });
        return response.ok;
    } catch {
        return false;
    }
}

async function createPageForFolder(folderName) {
    const template = `
    <!DOCTYPE html>
    <html lang="ua">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${folderName}</title>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/aditional-css/education.css">
    </head>
    <body class="education-body">
        <header>
            <nav data-hx-trigger="load" data-hx-swap="outerHTML" data-hx-get="header-nav.partial.html"></nav>
        </header>
        <section>
            <div class="education-page-banner aditional__banner">
                <h1 class="aditional__h1">${folderName}</h1>
            </div>
            <div class="accordion-container"></div>
        </section>
        <footer>
        </footer>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="../js/slick.min.js"></script>
        <script src="../js/index.js"></script>
        <script src="../js/education-accordeon.js"></script>
        <script src="../js/create-edu-page.js"></script>
    </body>
    </html>`;

    await savePage(`${folderName}.html`, template);
}

async function processFolders() {
    try {
        const items = await fetchWithCache(`https://api.github.com/repos/${username}/${repo}/contents/documents/education`);
        const currentFolders = items.filter(item => item.type === 'dir').map(item => item.name);

        const cachedFolders = getCachedFolders();

        // Додати нові або оновити існуючі
        for (const folder of currentFolders) {
            if (!cachedFolders.includes(folder)) {
                await createPageForFolder(folder);
            }
        }

        // Видалити старі
        for (const folder of cachedFolders) {
            if (!currentFolders.includes(folder)) {
                await deletePage(`${folder}.html`);
            }
        }

        updateCache(currentFolders);
    } catch (error) {
        console.error('Error processing folders:', error);
    }
}

processFolders();
