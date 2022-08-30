const API = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=0b3a6601571a3871ef494e8923b5e54c'

const form = document.querySelector('form')
const output = document.querySelector('.output')
const text_content = document.querySelector('#text_content')

const getWeather = async () => {
  const inp = document.querySelector('#inp')
  const url = API + inp.value + key
  const request = await fetch(url)
  const respons = await request.json()
  console.log(respons)
  render(respons)
  getMap(respons.coord)
  inp.value = ''
}

const render = (data) => {
  //output.innerHTML = ''
  text_content.innerHTML = ''
  const city = document.createElement('h2')
  const country = document.createElement('h3')
  const celcia = document.createElement('p')
  const farengeit = document.createElement('p')
  const main = document.createElement('p')
  const description = document.createElement('p')

  city.textContent = 'City: ' + data.name
  country.textContent = 'Country code: ' + data.sys.country
  celcia.textContent = 'Temp C: ' + Math.round(data.main.temp - 273.15)
  farengeit.textContent =
    'Temp F: ' + Math.round((data.main.temp - 273.15) * 1.8 + 32)
  main.textContent = 'Clouds: ' + data.weather[0].main
  description.textContent = data.weather[0].description

  text_content.append(city, country, celcia, farengeit, main, description)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  getWeather()
})

const getMap = ({lat, lon}) => {
  let map = document.createElement('div')
  map.id = 'map'
  map.style.width = '300px'
  map.style.height = '400px'

  DG.then(function () {
    map = DG.map('map', {
      center: [lat, lon],
      zoom: 13,
    })

    DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!')
  })

  text_content.append(map)
}
