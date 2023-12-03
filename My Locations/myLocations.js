const addInput = document.getElementById('addInput')
const addBtn = document.querySelector('.add-btn')
const chosenCitiesDiv = document.querySelector('.chosen-cities')

async function searchWeather(userCity) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=5fbbd0ed06aab0f745a98face997088c&units=metric`)
    const data = await response.json()

    // Creating Item (if the response is valid)
    if (data.message === 'city not found' || data.message === 'Nothing to geocode') {
        alert('Data not found! Check the speling!')
    } else {
        const itemBox = document.createElement('li')
        itemBox.setAttribute('class', 'chosen-item')
        chosenCitiesDiv.append(itemBox)

        const textContent = document.createElement('div')
        textContent.setAttribute('class', 'chosen-text-content')
        itemBox.append(textContent)

        const title = document.createElement('h1')
        title.setAttribute('class', 'chosen-title')
        title.innerHTML = data.name
        textContent.append(title)

        const condition = document.createElement('p')
        condition.setAttribute('class', 'chosen-weather-condition')
        condition.innerHTML = data.weather[0].description
        textContent.append(condition)

        const weatherImg = document.createElement('img')
        weatherImg.setAttribute('class', 'chosen-weather-img')
        weatherImg.src = `../src/svg/${data.weather[0].icon}.svg`
        itemBox.append(weatherImg)

        const chosenTemperature = document.createElement('h1')
        chosenTemperature.setAttribute('class', 'chosen-temp')
        chosenTemperature.innerHTML = `${Math.round(data.main.temp)}°`
        itemBox.append(chosenTemperature)

        const removeBtn = document.createElement('button')
        removeBtn.setAttribute('class', 'remove-chosen-item')
        removeBtn.innerHTML = '\u00d7'
        itemBox.append(removeBtn)

        saveData()
    }
}

// Adding item
addBtn.addEventListener('click', () => { // OnScreen button click
    searchWeather(addInput.value)
    addInput.value = null
})
addInput.addEventListener('keyup', (e) => { // OnKeyboard button click
    if (e.key == 'Enter') {
        searchWeather(addInput.value)
        addInput.value = null
    }
})

// Removing item
chosenCitiesDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove()
        saveData()
    }
})

// Save data
function saveData() {
    localStorage.setItem('myLocationsData', chosenCitiesDiv.innerHTML)
}
// Load data
function loadData() {
    chosenCitiesDiv.innerHTML = localStorage.getItem('myLocationsData')
}
loadData()