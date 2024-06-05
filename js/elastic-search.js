$(document).ready(function() {
    // Отримуємо дані через fetch
    fetch('json/file.json')
        .then(response => response.json())
        .then(data => {
            const listContainer = document.querySelector('.elastic');

            data.forEach(employee => {
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

            var lastActiveElement = null;

            $('.elastic').on('click', 'a', function(event) {
                event.preventDefault();
                
                var targetId = $(this).attr('href');
                
                if (lastActiveElement !== null) {
                    $(lastActiveElement).removeClass('active-search-card');
                }
                
                $(targetId).addClass('active-search-card');
                
                lastActiveElement = targetId;
                
                window.location.href = targetId;
            });
        })
        .catch(error => console.error('Помилка:', error));

    $('#elastic').on('input', function() {
        var val = $(this).val().trim().toLowerCase();
        var elasticItems = $('.elastic li');

        // Якщо інпут порожній, застосовуємо клас "hide" до всіх елементів
        if (val === '') {
            elasticItems.addClass('hide');
            return; // Завершуємо функцію, щоб уникнути подальшого виконання коду
        }

        // Інакше застосовуємо клас "hide" відповідно до результатів пошуку
        elasticItems.each(function(index) {
            if ($(this).text().toLowerCase().indexOf(val) === -1) {
                $(this).addClass('hide');
            } else {
                $(this).removeClass('hide');
            }
            
        });
    });
});

function clearInput() {
    var input = document.getElementById("elastic");
    input.value = ""; // Очищаємо вміст поля вводу
    $('.elastic li').addClass('hide'); // Додаємо клас "hide" до всіх елементів списку
}

// Викликаємо функцію clearInput при кліку на кнопку
document.querySelector(".clear-button").addEventListener("click", clearInput);

