document.addEventListener("DOMContentLoaded", function() {
    fetch("https://docs.google.com/spreadsheets/d/1q4l60xlMyc-1n8BP9DKrlC-YCAawaOy-JI3i8di-7NQ/export?format=csv")
        .then((response) => response.text())
        .then((data) => {
            const container = document.querySelector(".employee-container"); // Контейнер для карток
            const cards = []; // Масив для карток

            // Розбиваємо CSV на рядки
            const rows = data.trim().split("\n");

            // Обробляємо дані, починаючи з другого рядка (пропускаємо заголовки)
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].split(",");

                if (cells.length < 14) continue; // Пропускаємо неповні або порожні рядки

                const fullName = cells[1].trim();
                const department = cells[3].trim();
                const position = cells[4].trim();
                let phone = cells[9].trim(); // Телефон з 9 колонки
                const altPhone = cells[8].trim(); // Альтернативний телефон з 8 колонки
                let email = cells[12].trim(); // Пошта з 12 колонки
                const altEmail = cells[13].trim(); // Альтернативна пошта з 13 колонки
                const birthDate = cells[11].trim();
                const lastName = fullName.split(" ")[0];

                // Якщо телефон пустий, беремо значення з 8 колонки
                if (!phone) {
                    phone = altPhone;
                }

                // Якщо пошта пуста, беремо значення з 13 колонки
                if (!email) {
                    email = altEmail;
                }

                // Перевірка фото
                let photoSrc = `img/employee/${lastName}.jpg`;

                loadImage(photoSrc, lastName, fullName, department, position, phone, birthDate, email);
            }

            function loadImage(photoSrc, lastName, fullName, department, position, phone, birthDate, email) {
                let imgElement = new Image();
                imgElement.onload = function() {
                    appendCard(photoSrc, fullName, department, position, phone, birthDate, email);
                };
                imgElement.onerror = function() {
                    // Якщо .jpg не знайдено, пробуємо інші формати
                    let alternativeSrcs = [`img/employee/${lastName}.png`, `img/employee/${lastName}.jfif`, `img/employee/default.jpg`];
                    tryOtherFormats(alternativeSrcs, fullName, department, position, phone, birthDate, email);
                };
                imgElement.src = photoSrc;
            }

            function tryOtherFormats(srcList, fullName, department, position, phone, birthDate, email) {
                let index = 0;
                let tryNext = () => {
                    if (index >= srcList.length) return; // Усі формати перевірені, картка не додається
                    let imgElement = new Image();
                    imgElement.onload = function() {
                        appendCard(srcList[index], fullName, department, position, phone, birthDate, email);
                    };
                    imgElement.onerror = function() {
                        index++;
                        tryNext(); // Пробуємо наступний формат
                    };
                    imgElement.src = srcList[index];
                };
                tryNext();
            }

            function appendCard(photoSrc, fullName, department, position, phone, birthDate, email) {
                const cardHTML = `
                    <div class="card" id="${fullName.split(" ")[0]}">
                        <div class="employee-photo">
                            <img src="${photoSrc}" alt="Фото ${fullName}">
                        </div>
                        <div class="employee-info">
                            <h2 class="big__h2">${fullName}</h2>
                            <p>Департамент: ${department}</p>
                            <p>Посада: ${position}</p>
                            <div class="btn-wrapper">
                                <a class="team-active" href="#"><span>Детальна інформація</span></a>
                            </div>
                            <div class="employee-info-full hidden">
                                <p>Телефон: ${phone || "Не вказано"}</p>
                                <p>Дата народження: ${birthDate}</p>
                                <p>Пошта: ${email || "Не вказано"}</p>
                            </div>
                        </div>
                    </div>
                `;
                cards.push(cardHTML);

                // Оновлюємо контент після кожного додавання картки
                container.innerHTML = cards.join("");
                addToggleListeners();
            }

            function addToggleListeners() {
                // Додавання обробника подій до кожного посилання
                const toggleLinks = document.querySelectorAll(".team-active");
                toggleLinks.forEach(function(link) {
                    link.addEventListener("click", function(event) {
                        event.preventDefault();
                        const card = event.target.closest(".card");
                        const infoFull = card.querySelector(".employee-info-full");
                        infoFull.classList.toggle("hidden");
                        infoFull.classList.toggle("active");
                    });
                });
            }
        })
        .catch((error) => {
            console.error("Error fetching the CSV file:", error);
        });
});
