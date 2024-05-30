fetch('../json/file.json')
.then(response => response.json())
.then(data => {
    // Отримання контейнера для карточок працівників
    var container = document.getElementById('employees-container');

    // Створення HTML для кожного працівника
    data.forEach(function(employee) {
        var cardHTML = `
            <div class="card">
                <h2>${employee["П.І.Б"]}</h2>
                <p>Департамент: ${employee["Департамент"]}</p>
                <p>Позиція в компанії: ${employee["Позиція в компанії"]}</p>
                <p>Дата народження: ${employee["Дата народження"]}</p>
                <p>Електронна пошта: ${employee["e-mail особистий"]}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
})
.catch(error => console.error('Помилка:', error));