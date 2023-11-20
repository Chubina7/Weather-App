//                                      ** DOM Elements **

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
const overlay = document.querySelector('.overlay')
const overlayCard = document.querySelector('.overlay-card')
const hourlyItemDivArr = Array.from(document.querySelectorAll('.hourly-item'))
const hourlyTimeArr = Array.from(document.querySelectorAll('.hourly-item-time'))
const hourlyTempArr = Array.from(document.querySelectorAll('.hourly-item-temp'))
const hourlyItemImgArr = Array.from(document.querySelectorAll('.hourly-item-img'))

//                                      ** Current Weather **

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
            })
}, () => {
    overlay.style.display = 'block'
    overlayCard.style.display = 'block'
    console.error('User dennied location tracking, so the weather is unavailable!');
})

//                                      ** Current Date **

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
currentDate.innerHTML = `${weekDays[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`

//                                      ** Hourly Date **

navigator.geolocation.getCurrentPosition(pos => { // Getting location details in numbers
    // Making Binding to save the user's longitude and lattitude numbers
    const usersLongitude = pos.coords.longitude
    const usersLattitude = pos.coords.latitude

    // Fetching data to get hourly information
    fetch(`https://api.open-meteo.com/v1/dwd-icon?latitude=${usersLattitude}&longitude=${usersLongitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,rain&timezone=auto&forecast_days=1`)
        .then(response => response.json())
        .then(result => {
            // Puting hours into DOM elements
            hourlyTimeArr.forEach(hourlyTime => {
                hourlyTime.innerHTML = result.hourly.time[hourlyTimeArr.indexOf(hourlyTime)].split('T')[1]
                // Change style the element which is current time
                if (Math.floor(hourlyTime.innerHTML.split(':')[0] * 1) == new Date().getHours()) {
                    hourlyItemDivArr[hourlyTimeArr.indexOf(hourlyTime)].classList.add('hourly-item-active')
                }
            })

            // Putting temperature in each time item
            hourlyTempArr.forEach(hourlyTemp => {
                hourlyTemp.innerHTML = '≈ ' + Math.round(result.hourly.temperature_2m[hourlyTempArr.indexOf(hourlyTemp)]) + '°'
            })

            // Putting img in each hourly item
            hourlyItemImgArr.forEach(hourlyImg => {
                hourlyImg.src = './src/svg/01d.svg'
                // Setting images appropriately to the day or night
                if (Math.floor(hourlyTimeArr[hourlyItemImgArr.indexOf(hourlyImg)].innerHTML.split(':')[0] * 1) >= sunset.innerHTML.split(':')[0] * 1
                    || Math.floor(hourlyTimeArr[hourlyItemImgArr.indexOf(hourlyImg)].innerHTML.split(':')[0] * 1) <= sunrise.innerHTML.split(':')[0] * 1) {
                    hourlyImg.src = './src/svg/01n.svg'
                }
            })
        })
})