
// Charger la configuration de la ville depuis conf.json
async function weatherApp() {
    try {
        const response = await fetch('conf.json');
        const config = await response.json();
        // Appel de la fonction pour récupérer les données météo
        await getWeatherData(config);
    } catch (error) {
        console.error('Erreur lors du chargement de la configuration : ', error);
    }
}

// Fonction pour récupérer les données météo depuis l'API
async function getWeatherData(config) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${config.apiKey}&q=${config.city}&lang=en`);
        const data = await response.json();
        // Manipulation des données récupérées
        await displayWeatherData(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données météo : ', error);
    }
}

// Fonction pour afficher les données météo dans l'interface
async function displayWeatherData(data) {
    const { text, icon } = data.current.condition;
    const { temp_c, feelslike_c, humidity } = data.current;
    const { name, country } = data.location;
    document.querySelector(".cityName").innerText = name;
    document.querySelector(".cityCountry").innerText = country;
    document.querySelector(".icon").src = `https:${icon}`;
    document.querySelector(".text").innerText = text;
    document.querySelector(".temp").innerText = `${temp_c}°C`;
    document.querySelector(".feelsLike").innerText = `${feelslike_c}°C`;
    document.querySelector(".humidity").innerText = `${humidity}%`;
}

weatherApp();

// // Décommenter la ligne ci-dessous pour actualiser toutes les heures
// setInterval(testInterval, 3600000); // 3600000 ms = 1 heure

module.exports = { displayWeatherData };
