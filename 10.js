const weatherCodes = {
    // Sunny
    0: '&#9728;',
    1: '&#9728;',
    // Overcast
    2: '&#9729;',
    3: '&#9729;',
    // Fog
    45: '&#9729;',
    48: '&#9729;',
    // Rain
    51: '&#9730;',
    53: '&#9730;',
    55: '&#9730;',
    56: '&#9730;',
    57: '&#9730;',
    61: '&#9730;',
    63: '&#9730;',
    65: '&#9730;',
    66: '&#9730;',
    67: '&#9730;',
    80: '&#9730;',
    81: '&#9730;',
    82: '&#9730;',
    // Snow
    71: '&#10052;',
    73: '&#10052;',
    75: '&#10052;',
    77: '&#10052;',
    85: '&#10052;',
    86: '&#10052;',
    // Thunder
    95: '&#10572;',
    96: '&#10572;',
    99: '&#10572;'
}

const areaCodes = {
    'Oslo': ['59.922671', '10.737044'],
    'Tokyo': ['35.6895', '139.6917'],
    'New York': ['40.777233', '-73.968891'],
    'Paris': ['48.864020', '2.346003'],
    'Sydney': ['-33.898228', '151.207767'],
    'Moscow': ['55.711999', '37.618861'],
    'Alexandria': ['31.175628', '30.024376'],
    'Marbella': ['36.502083', '-4.770046']
}

let weatherData = {};
let weatherDataFormat = {};

function getWeatherData() {
    const promises = Object.keys(areaCodes).map(key => {
        return fetch('https://api.open-meteo.com/v1/forecast?latitude=' + areaCodes[key][0] + '&longitude=' + areaCodes[key][1] + '&current_weather=true')
            .then(response => response.json())
            .then(json => {
                weatherData[key] = json['current_weather'];
                weatherDataFormat[key] = json['current_weather_units'];
            });
    });
    Promise.all(promises).then(() => {
        updateForecast();
    });
}

function updateForecast() {
    const section = document.querySelector('.weather-section');

    section.innerHTML = '';

    for (const key of Object.keys(areaCodes)) {
        section.appendChild(createContainer(key));
    }
}

function createForecast() {
    const section = document.createElement('section');
    section.classList.add('weather-section');

    document.body.insertBefore(section, document.querySelector('footer'));
}

function createContainer(area) {
    const container = document.createElement('div');
    container.classList.add('weather-container');

    const place = document.createElement('p');
    place.classList.add('stor');
    place.innerText = area;

    const weatherCode = document.createElement('p');
    weatherCode.classList.add('stor');
    weatherCode.innerHTML = weatherCodes[weatherData[area]['weathercode']];

    const temp = document.createElement('p');
    temp.classList.add('stor');
    temp.innerHTML = weatherData[area]['temperature'] + ' ' + weatherDataFormat[area]['temperature'];

    const wind = document.createElement('p');
    wind.innerText = '⚐ ' + weatherData[area]['windspeed'] + ' ' + weatherDataFormat[area]['windspeed'];

    const direction = document.createElement('p');
    direction.innerText = weatherData[area]['winddirection'] + weatherDataFormat[area]['winddirection']

    container.appendChild(place);
    container.appendChild(document.createElement('br'));
    container.appendChild(weatherCode);
    container.appendChild(temp);
    container.appendChild(document.createElement('br'));
    container.appendChild(wind);
    container.appendChild(direction);

    return container;
}

createForecast();
getWeatherData();

setInterval(getWeatherData, 600000);