const apiKey = "e9a5d3b74bf84418b11193028231901";

// Елементи на сторінці
const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

function removeCard() {
  // Видаляємо попередню карточку
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  // Відобразити карту з помилкою
  const html = `<div class="card">${errorMessage}</div>`;

  // Відображаємо карточку на сторінці
  header.insertAdjacentHTML("afterend", html);
}

function showCard({ name, country, temp, condition }) {
  // Розмітка для карточки

  const html = `<div class="card">
<h2 class="card-city">${name} <span>${country}</span></h2>

<div class="card-weather">
    <div class="card-value">${temp}<sup>°c</sup></div>
    <img class="card-img" src="./img/weather.png" alt="weather">
</div>

<div class="card-desc">${condition}</div>

</div>`;

  // Відображаємо карточку на сторінці
  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  // Адреса запиту
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// Слухаємо відправку форми

form.onsubmit = async function (e) {
  // Відміняємо відпраку форми
  e.preventDefault();

  // Беремо значення з інпута, обрізаємо пробіли та таби
  let city = input.value.trim();

  // Отримуємо дані з сервера
  const data = await getWeather(city);

  // Перевірка на помилку
  if (data.error) {
    // якщо є помилка - виводимо її
    removeCard();
    showError(data.error.message);
  } else {
    // якщо помилки немає - виводимо картку
    // Відображаємо отримані дані в карточці
    removeCard();

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
    };

    showCard(weatherData);
  }
};
