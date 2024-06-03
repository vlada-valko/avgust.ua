fetch('json/file.json')
    .then(response => response.json())
    .then(data => {
        // Отримання контейнера для карточок працівників
        var container = document.querySelector('.employees-container');
        var cards = []; // Масив для зберігання карточок

        // Створення HTML для кожного працівника
        data.forEach(function(employee) {
            const fullName = employee["П.І.Б"];
            const lastName = fullName.split(" ")[0];
            
            // Створення URL для фотографії
            let photoSrc = `../img/employee/${lastName}.jpg`;
            let imgElement = new Image();
            imgElement.onload = function() {
                // Фото з розширенням .jpg знайдено
                appendCard(photoSrc, employee);
            };
            imgElement.onerror = function() {
                // Фото з розширенням .jpg відсутнє, спробуємо використати .png
                photoSrc = `../img/employee/${lastName}.png`;
                let imgElementPng = new Image();
                imgElementPng.onload = function() {
                    // Фото з розширенням .png знайдено
                    appendCard(photoSrc, employee);
                };
                imgElementPng.onerror = function() {
                    // Фото з розширенням .png відсутнє, спробуємо використати .jfif
                    photoSrc = `../img/employee/${lastName}.jfif`;
                    let imgElementJfif = new Image();
                    imgElementJfif.onload = function() {
                        // Фото з розширенням .jfif знайдено
                        appendCard(photoSrc, employee);
                    };
                    imgElementJfif.onerror = function() {
                        // Фото з розширенням .jfif відсутнє, використаємо фото за замовчуванням
                        photoSrc = `../img/employee/default.jpg`;
                        appendCard(photoSrc, employee);
                    };
                    imgElementJfif.src = photoSrc;
                };
                imgElementPng.src = photoSrc;
            };
            imgElement.src = photoSrc;

            // Функція для створення карточки та додавання її до масиву
            function appendCard(photoSrc, employee) {
                var cardHTML = `
                    <div class="card">
                        <div class="employee-photo"> 
                            <img src="${photoSrc}" alt="Фото ${employee['П.І.Б']}">
                        </div>
                        <div class="employee-info">
                            <h2>${employee["П.І.Б"]}</h2>
                            <p>Департамент: ${employee["Департамент"]}</p>
                            <p>Позиція в компанії: ${employee["Позиція в компанії"]}</p>
                            <div class="btn-wrapper">
                                <a href="#"><span>Детальна інформація</span></a>
                            </div>
                        </div>
                    </div>
                `;
                cards.push(cardHTML); // Додавання HTML карточки до масиву
                if (cards.length === data.length) {
                    // Якщо усі карточки створені, вставляємо їх до контейнера
                    container.innerHTML = cards.join('');
                }
            }
        });
    });
