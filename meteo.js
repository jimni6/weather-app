
// Charger la configuration de la ville depuis conf.json
function weatherApp() {
    fetch('conf.json')
    .then(response => response.json())
    .then(config => {  
        // Appel de la fonction pour récupérer les données météo
        getWeatherData(config);
    })
    .catch(error => console.error('Erreur lors du chargement de la configuration : ', error));
}


// Fonction pour récupérer les données météo depuis l'API
function getWeatherData(config) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${config.apiKey}&q=${config.city}&lang=en`)
    .then(response => response.json())
    .then(data => {
        // Manipulation des données récupérées
        displayWeatherData(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données météo : ', error));
}

// Fonction pour afficher les données météo dans l'interface
function displayWeatherData(data) {
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

// // Actualiser les données météo toutes les heures
// setInterval(testInterval, 3600000); // 3600000 ms = 1 heure

module.exports = { displayWeatherData };
