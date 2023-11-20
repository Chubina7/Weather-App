// DOM Elements
const currentTemp = document.getElementById('temperature')
const weatherStatus = document.getElementById('weatherStatus')
const mainweatherIcon = document.getElementById('mainweatherIcon')
const currentDate = document.getElementById('currentDate')
const clouds = document.getElementById('clouds')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const sunset = document.getElementById('sunset')
const sunrise = document.getElementById('sunrise')
const sunriseItem = document.getElementById('sunriseItem')
const sunsetItem = document.getElementById('sunsetItem')

//                                      Current Weather
var userCity // Variable to save the name of the city where the user is loggined in
navigator.geolocation.getCurrentPosition(pos => { // Getting location details in numbers
    // Making Binding to save the user's longitude and lattitude numbers
    const usersLongitude = pos.coords.longitude
    const usersLattitude = pos.coords.latitude

    // Fetching data to convert the coordinates into city name
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${usersLattitude}&longitude=${usersLongitude}&localityLanguage=en`)
        .then(res => res.json())
        .then(result => {
            userCity = result.city; // User's city name is now served into the global variable
        })
        .then(
            // Created global function to get the weather information about current location
            async function fetchingWeather() {
                const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&appid=ea2e0e312c8eb0ddc9bdfea03fa2db7c&units=metric')
                const data = await response.json()

                // Changing the DOM after succsessful parse of API
                currentTemp.innerHTML = `${Math.round(data.main.temp)}°`
                weatherStatus.innerHTML = data.weather[0].description.replace(data.weather[0].description[0], data.weather[0].description.split('')[0].toUpperCase())
                mainweatherIcon.src = `./src/svg/${data.weather[0].icon}.svg`
                clouds.innerHTML = `${data.cod}`
                wind.innerHTML = `${data.wind.speed} km/h`
                humidity.innerHTML = `${data.main.humidity}%`
                sunset.innerHTML = `${new Date(data.sys.sunset * 1000).getHours()}:${new Date(data.sys.sunset * 1000).getMinutes()}`
                sunrise.innerHTML = `${new Date(data.sys.sunrise * 1000).getHours()}:${new Date(data.sys.sunrise * 1000).getMinutes()}`

                if (new Date(data.sys.sunset * 1000).getHours() > new Date().getHours()) {
                    sunsetItem.style.display = 'flex'
                    sunriseItem.style.display = 'none'
                } else {
                    sunsetItem.style.display = 'none'
                    sunriseItem.style.display = 'flex'
                }

                console.log(data);
            })
}, error => console.log("Here should be popup"))

//                                      Current Date
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
currentDate.innerHTML = `${weekDays[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`

