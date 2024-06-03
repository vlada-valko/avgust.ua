$(document).ready(function() {
    $('.elastic ul').addClass('hide'); // Initially hide all list items
    
    $('#elastic').on('input', function() {
        var val = $(this).val().trim().toLowerCase();
        var elasticItems = $('.elastic li');
        if (val != '') {
            elasticItems.each(function(index) {
                if ($(this).text().toLowerCase().search(val) == -1) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        } else {
            elasticItems.each(function(index) {
                $(this).removeClass('hide');
            });
        }
    });
});

fetch('json/file.json')
    .then(response => response.json())
    .then(data => {
        const listContainer = document.querySelector('.elastic');

        data.forEach(employee => {
            const listItem = document.createElement('li');
            listItem.textContent = `${employee["П.І.Б"]} - ${employee["Позиція в компанії"]} (${employee["Департамент"]})`;
            listContainer.appendChild(listItem);
        });
    })
    .catch(error => console.error('Помилка:', error));
