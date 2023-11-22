const searchInput = document.getElementById('searchInput')
const searchBtn = document.querySelector('.search-btn')

// Getting information from API
async function searchWeather(userCity) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=5fbbd0ed06aab0f745a98face997088c`)
    const data = await response.json()

    console.log(data);
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