const searchInput = document.getElementById('searchInput')
const searchBtn = document.querySelector('.search-btn')
const searchedImg = document.getElementById('searchedImg')
const searchedTemperature = document.getElementById('searchedTemperature')
const searchedCity = document.getElementById('searchedCity')


// Getting information from API
async function searchWeather(userCity) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=5fbbd0ed06aab0f745a98face997088c&units=metric`)
    const data = await response.json()
    document.querySelector('.static').style.display = 'none'
    document.querySelector('.weather-data').style.display = 'flex'

    searchedImg.src = `../src/svg/${data.weather[0].icon}.svg`
    searchedTemperature.innerHTML = `${Math.round(data.main.temp)}°C`
    searchedCity.innerHTML = data.name
}

// Search button event listener
searchBtn.addEventListener('click', () => {
    searchWeather(searchInput.value)
    searchInput.value = null
})
// Input field action on clicking keyboard "ENTER"
searchInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        searchWeather(searchInput.value)
        searchInput.value = null
    }
})