

    // Отримуємо дані через fetch
    fetch('json/file.json')
        .then(response => response.json())
        .then(data => {
            const listContainer = document.querySelector('.elastic');

            data.forEach(employee => {
                const listItem = document.createElement('li');
                const className = employee["П.І.Б"].replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase();
                listItem.className = className;

                const link = document.createElement('a');
                const lastName = employee["П.І.Б"].split(" ")[0];
                link.href = `#${lastName}`;
                link.textContent = `${employee["П.І.Б"]} - ${employee["Позиція в компанії"]} (${employee["Департамент"]})`;

                listItem.appendChild(link);
                listContainer.appendChild(listItem);
            });

            // Всю вашу логіку тут (обробка подій, пошук і т.д.)
            $('.elastic').addClass('hide');
            
      

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
            var elasticItems = $('.elastic li a');
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