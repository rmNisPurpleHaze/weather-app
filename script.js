const apiKey = 'e9a5d3b74bf84418b11193028231901';


// Елементи на сторінці
const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');


// Слухаємо відправку форми

form.onsubmit = function (e) {
    // Відміняємо відпраку форми
    e.preventDefault();

    // Беремо значення з інпута, обрізаємо пробіли та таби
    let city = input.value.trim();

    // Адреса запиту
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Виконуємо запит
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data);

            // Перевірка на помилку
            if (data.error) {
                // якщо є помилка - виводимо її

                // Видаляємо попередню карточку
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();

                // Відобразити карту з помилкою
                const html = `<div class="card">${data.error.message}</div>`

                // Відображаємо карточку на сторінці
                header.insertAdjacentHTML('afterend', html)
                
            } else {
                // якщо помилки немає - виводимо картку
                // Відображаємо отримані дані в карточці
                // Видаляємо попередню карточку
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();
                    
                // Розмітка для карточки

                const html = `<div class="card">
                                <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

                                <div class="card-weather">
                                    <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                                    <img class="card-img" src="./img/weather.png" alt="weather">
                                </div>

                                <div class="card-desc">${data.current.condition.text}</div>

                                </div>`;

                // Відображаємо карточку на сторінці
                header.insertAdjacentHTML('afterend', html)
            }
        
            
       

    })
}