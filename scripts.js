const searchBar = document.getElementById('searchBar');
const form = document.querySelector('form');
const currlocation = document.querySelector('.location');
const weatherImg = document.getElementById('weatherImg');
const temperature = document.querySelector('.temp');
const weatherDescription = document.querySelector('.weatherDescription');
const precipitationInfo = document.getElementById('precipInfo');
const humidityInfo = document.getElementById('humidInfo');
const windInfo = document.getElementById('windInfo');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchBarInput = searchBar.value;
    const currDate = getCurrentDate();
    searchWeather(searchBarInput, currDate);
})

async function searchWeather(searchLocation, date) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}/${date}?key=NXEY4KJ8DDP6M5CV3PSP2WCNQ`, { mode: 'cors' });
        const data = await response.json();
        console.log(data);
        updateLocationName(data);
        updateWeatherTemp(data);
        displayWeatherImage(data);
    }
    catch {
        console.error('Error fetching weather: ', error);
    }
}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return (year + '-' + month + '-' + day)
}

const weatherCategory = {
    'rainy': ['rain'],
    'cloudy': ['fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night'],
    'windy': ['wind'],
    'sunny': ['clear-day', 'clear-night'],
    'snowy': ['snow']
};

const weatherImage = {
    'rainy': './images/rainy.png',
    'cloudy': './images/cloudy.png',
    'windy': './images/windy.png',
    'sunny': './images/sunny.png',
    'snowy': './images/snowy.png'
}

function getWeatherCategory(condition) {
    for (const [category, conditions] of Object.entries(weatherCategory))
    {
        if(conditions.includes(condition))
        {
            return category;
        }
    }
    console.log(`Condition not matched: ${condition}`);
}

function displayWeatherImage(data) {
    const weatherCondition = data.days[0].icon;
    console.log(weatherCondition);

    const category = getWeatherCategory(weatherCondition);
    const imgFile = weatherImage[category];

    weatherImg.src = imgFile;
}

function updateLocationName(data) {
    const newLocation = data.address;
    currlocation.textContent = newLocation.charAt(0).toUpperCase() + newLocation.slice(1);
}

function updateWeatherTemp(data) {
    temperature.textContent = data.days[0].temp;

    const newDescription = data.days[0].icon
    weatherDescription.textContent = newDescription.charAt(0).toUpperCase() + newDescription.slice(1);
}
//https://docs.google.com/spreadsheets/d/1cc-jQIap7ZToVaEgiXEk_Aa6YVYjSObLV9PMe4oHrFg/edit?gid=1769797687#gid=1769797687