const { displayWeatherData } = require('./meteo'); // Import the function to be tested

describe('displayWeatherData', () => {
    test('displays weather data in DOM elements', () => {
        // Mock DOM elements
        document.body.innerHTML = `
            <div>
                <div class="cityName"></div>
                <div class="cityCountry"></div>
                <img class="icon" alt="weather icon">
                <div class="text"></div>
                <div class="temp"></div>
                <div class="feelsLike"></div>
                <div class="humidity"></div>
            </div>
        `;
        const data = {
            current: {
                condition: { text: 'Clear', icon: 'icon.png' },
                temp_c: 20,
                feelslike_c: 22,
                humidity: 70
            },
            location: { name: 'Test City', country: 'Test Country' }
        };

        displayWeatherData(data);

        expect(document.querySelector('.cityName').innerText).toBe('Test City');
        expect(document.querySelector('.cityCountry').innerText).toBe('Test Country');
        expect(document.querySelector('.icon').src).toBe('https://icon.png/');
        expect(document.querySelector('.text').innerText).toBe('Clear');
        expect(document.querySelector('.temp').innerText).toBe('20°C');
        expect(document.querySelector('.feelsLike').innerText).toBe('22°C');
        expect(document.querySelector('.humidity').innerText).toBe('70%');
    });
});

