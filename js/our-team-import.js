document.addEventListener("DOMContentLoaded", function() {
    fetch("json/file.json")
        .then((response) => response.json())
        .then((data) => {
            var container = document.querySelector(".employee-conteiner");
            var cards = [];

            data.forEach(function (employee) {
                const fullName = employee["П.І.Б"];
                const lastName = fullName.split(" ")[0];

                let photoSrc = `img/employee/${lastName}.jpg`;
                let imgElement = new Image();
                imgElement.onload = function () {
                    appendCard(photoSrc, employee);
                };
                imgElement.onerror = function () {
                    photoSrc = `img/employee/${lastName}.png`;
                    let imgElementPng = new Image();
                    imgElementPng.onload = function () {
                        appendCard(photoSrc, employee);
                    };
                    imgElementPng.onerror = function () {
                        photoSrc = `img/employee/${lastName}.jfif`;
                        let imgElementJfif = new Image();
                        imgElementJfif.onload = function () {
                            appendCard(photoSrc, employee);
                        };
                        imgElementJfif.onerror = function () {
                            photoSrc = `img/employee/default.jpg`;
                            appendCard(photoSrc, employee);
                        };
                        imgElementJfif.src = photoSrc;
                    };
                    imgElementPng.src = photoSrc;
                };
                imgElement.src = photoSrc;

                function appendCard(photoSrc, employee) {
                    var cardHTML = `
                        <div class="card" id="${lastName}" >
                            <div class="employee-photo">
                                <img src="${photoSrc}" alt="Фото ${employee["П.І.Б"]}">
                            </div>
                            <div class="employee-info">
                                <h2 class="big__h2">${employee["П.І.Б"]}</h2>
                                <p>Департамент: ${employee["Департамент"]}</p>
                                <p>Посада: ${employee["Позиція в компанії"]}</p>
                                <div class="btn-wrapper">
                                    <a class="team-active" href="#"><span>Детальна інформація</span></a>
                                </div>
                                <div class="employee-info-full hidden">
                                    <p>Телефон: ${employee["Особистий мобільний"]}</p>
                                    <p>Дата народження: ${employee["Дата народження"]}</p>
                                    <p>Пошта: ${employee["e-mail особистий"]}</p>

                                </div>
                            </div>
                        </div>
                    `;
                    cards.push(cardHTML);
                    if (cards.length === data.length) {
                        container.innerHTML = cards.join("");
                        // Додавання обробника подій до кожного посилання
                        var toggleLinks = document.querySelectorAll(".team-active");
                        toggleLinks.forEach(function(link) {
                            link.addEventListener("click", function(event) {
                                event.preventDefault();
                                var card = event.target.closest(".card");
                                var infoFull = card.querySelector(".employee-info-full");
                                infoFull.classList.toggle("hidden");
                                infoFull.classList.toggle("active");
                            });
                        });
                    }
                }
            });
        });
});


