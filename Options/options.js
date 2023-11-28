const themeToggler = document.getElementById('themeToggler')
const body = document.getElementsByTagName('body')[0]

window.addEventListener('load', () => {
    // Theme color check
    if (localStorage.getItem('userPreferedTheme') === 'white') {
        // Changing elements according to chosen theme
        document.getElementsByTagName('body')[0].classList.add('whiteBackground')
    }
})

themeToggler.addEventListener('click', () => {
    body.classList.toggle('whiteBackground')
    if (body.classList.length === 1) {
        localStorage.setItem('userPreferedTheme', 'white')
    } else {
        localStorage.setItem('userPreferedTheme', '')
    }
    console.log(localStorage);
})