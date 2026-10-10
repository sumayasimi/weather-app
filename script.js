//bd070fcfb186400a90351829261010

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weather-card");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) return;
  message.textContent = "Loading";
  weatherCard.hidden = true;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=bd070fcfb186400a90351829261010&q=${city}`,
    );

    if (!response.ok) {
      throw new Error(
        response.status === 400
          ? "City not Found"
          : "Failed to fetch weather data",
      );
    }

    const data = await response.json();

    document.getElementById("city-name").textContent =
      `${data.location.name}, ${data.location.country}`;

    document.getElementById("temp").textContent = `${data.current.temp_c} °C`;

    document.getElementById("condition").textContent =
      data.current.condition.text;

    document.getElementById("humidity").textContent =
      `Humidity: ${data.current.humidity}%`;

    document.getElementById("wind").textContent =
      `Wind: ${data.current.wind_kph} km/h`;

    message.textContent = "";
    weatherCard.hidden = false;
  } catch (err) {
    console.log(err);
  }
});
