import fetch from 'node-fetch';

const username = 'vlada-valko';
const repo = 'avgust.ua';
const githubToken = process.env.GITHUB_TOKEN;

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

async function savePage(fileName, content) {
    const url = `https://api.github.com/repos/${username}/${repo}/contents/documents/education/${fileName}`;

    const data = {
        message: `Create ${fileName}`,
        content: Buffer.from(content).toString('base64'),
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

async function checkIfPageExists(folderName) {
    const url = `https://api.github.com/repos/${username}/${repo}/contents/documents/education/${folderName}.html`;

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

async function processFolders() {
    try {
        const items = await fetchWithCache(`https://api.github.com/repos/${username}/${repo}/contents/documents/education`);

        if (Array.isArray(items)) {
            const folders = items.filter(item => item.type === 'dir');

            for (const folder of folders) {
                const pageExists = await checkIfPageExists(folder.name);

                if (!pageExists) {
                    await createPageForFolder(folder.name);
                }
            }
        } else {
            console.error('Error: Expected an array of items but received:', items);
        }
    } catch (error) {
        console.error('Error processing folders:', error);
    }
}

processFolders();
