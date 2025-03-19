const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

getWeatherButton.addEventListener('click', async () => {
  const city = cityInput.value;
  if (!city) {
    weatherInfo.innerHTML = '<p>Please enter a city name!</p>';
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
      const weather = data.weather[0];
      const temperature = data.main.temp;
      const humidity = data.main.humidity;

      weatherInfo.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>${weather.description}</p>
        <div class="temperature">${temperature}°C</div>
        <p>Humidity: ${humidity}%</p>
      `;
    }
  } catch (error) {
    weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
  }
});
