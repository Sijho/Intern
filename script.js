async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    // 1. Get latitude and longitude from geocoding API
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found.");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Get weather data using coordinates
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherResponse.json();

    const weather = weatherData.current_weather;

    // 3. Update UI
    document.getElementById("cityName").textContent = `${name}, ${country}`;
    document.getElementById("temperature").textContent = weather.temperature;
    document.getElementById("wind").textContent = weather.windspeed;

    document.getElementById("weatherResult").classList.remove("hidden");

  } catch (error) {
    alert("Error fetching weather data.");
    console.error(error);
  }
}
