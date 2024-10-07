$(document).ready(function() {
    // Отримуємо дані через fetch
    fetch("https://docs.google.com/spreadsheets/d/1q4l60xlMyc-1n8BP9DKrlC-YCAawaOy-JI3i8di-7NQ/export?format=csv")
        .then(response => response.text()) // Отримуємо текст замість JSON
        .then(data => {
            const listContainer = document.querySelector('.elastic');
            const rows = data.split('\n'); // Розбиваємо текст на рядки
            const headers = rows[0].split(','); // Отримуємо заголовки з першого рядка
            const employees = []; // Масив для зберігання співробітників

            // Ітеруємо по рядках, починаючи з другого (пропускаємо заголовки)
            rows.slice(1).forEach(row => {
                const cells = row.split(','); // Розбиваємо рядок на комірки
                if (cells.length < headers.length) return; // Пропускаємо неповні рядки

                const employee = {
                    "П.І.Б": cells[1].trim(),
                    "Позиція в компанії": cells[4].trim(),
                    "Департамент": cells[3].trim(),
                    "ID": cells[1].trim().split(" ")[0] // Зберігаємо ID для переходу на картку
                };

                employees.push(employee); // Додаємо співробітника до масиву

                const listItem = document.createElement('li');
                const className = employee["П.І.Б"].replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase();
                listItem.className = 'hide'; // Застосовуємо клас "hide" до всіх елементів

                const link = document.createElement('a');
                const lastName = employee["П.І.Б"].split(" ")[0];
                link.href = `#${lastName}`;
                link.textContent = `${employee["П.І.Б"]} - ${employee["Позиція в компанії"]} (${employee["Департамент"]})`;

                listItem.appendChild(link);
                listContainer.appendChild(listItem);
            });

            $('#elastic').on('input', function() {
                var val = $(this).val().trim().toLowerCase();
                listContainer.innerHTML = ''; // Очищаємо список

                if (val === '') {
                    return; // Завершуємо функцію, якщо поле порожнє
                }

                // Фільтруємо співробітників відповідно до введеного значення
                employees.forEach(employee => {
                    if (employee["П.І.Б"].toLowerCase().includes(val) || 
                        employee["Позиція в компанії"].toLowerCase().includes(val) ||
                        employee["Департамент"].toLowerCase().includes(val)) {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = `#${employee.ID}`;
                        link.textContent = `${employee["П.І.Б"]} - ${employee["Позиція в компанії"]} (${employee["Департамент"]})`;
                        listItem.appendChild(link);
                        listContainer.appendChild(listItem);
                    }
                });
            });

            // Обробка кліка на елементі списку
            listContainer.addEventListener('click', function(event) {
                if (event.target.tagName === 'A') {
                    event.preventDefault(); // Уникнути стандартного переходу
                    const targetId = event.target.getAttribute('href');
                    window.location.href = targetId; // Переходити до картки співробітника

                    // Додаємо клас active-search-card до картки
                    const card = document.querySelector(targetId); // Отримуємо картку за ID
                    if (card) {
                        card.classList.add('active-search-card');
                    }
                }
            });

        })
        .catch(error => console.error('Помилка:', error));

    function clearInput() {
        var input = document.getElementById("elastic");
        input.value = ""; // Очищаємо вміст поля вводу
        $('.elastic li').addClass('hide'); // Додаємо клас "hide" до всіх елементів списку
    }

    // Викликаємо функцію clearInput при кліку на кнопку
    document.querySelector(".clear-button").addEventListener("click", clearInput);
});
