const searchBar = document.getElementById('searchBar');
const form = document.querySelector('form');
const currlocation = document.querySelector('.location');
const weatherImg = document.getElementById('weatherImg');
const temperature = document.querySelector('.temp');
const weatherType = document.querySelector('.weatherType');
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
        temperature.textContent = data.days[0].temp;
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

//https://docs.google.com/spreadsheets/d/1cc-jQIap7ZToVaEgiXEk_Aa6YVYjSObLV9PMe4oHrFg/edit?gid=1769797687#gid=1769797687