const container = document.querySelector('.container')
const buttons = document.querySelectorAll('.main-card > div:nth-child(2) > p')
const daily = document.getElementById('daily')
const weekly = document.getElementById('weekly')
const monthly = document.getElementById('monthly')

fetch('./data.json')
.then(res => res.json())
.then(data => {
  data.forEach(x => {
    card(x.title,
      {
        current: x.timeframes.daily.current,
        previous: x.timeframes.daily.previous
      },
      {
        current: x.timeframes.weekly.current,
        previous: x.timeframes.weekly.previous
      },
      {
        current: x.timeframes.monthly.current,
        previous: x.timeframes.monthly.previous
    })
    const generatedCards = document.querySelectorAll('.card')
    generatedCards.forEach(x => {
      x.weekly()
    })
  })
})

const card = (name, daily, weekly, monthly) => {
  const div = document.createElement('div')
  const innerDiv = document.createElement('div')
  const top = document.createElement('div')
  const bot = document.createElement('div')
  const title = document.createElement('p')
  const img = document.createElement('img')
  const h1 = document.createElement('h1')
  const p = document.createElement('p')
  div.appendChild(innerDiv)
  innerDiv.append(top, bot)
  top.append(title, img)
  bot.append(h1, p)
  div.classList.add('card')
  title.classList.add('title')
  p.classList.add('ph')
  img.setAttribute('src', './images/icon-ellipsis.svg')
  img.classList.add('ellipsis')
  title.textContent = name

  div.daily = () => {
    h1.textContent = `${daily.current}hrs`
    p.textContent = `Previous - ${daily.previous}hrs`
  }
  div.weekly = () => {
    h1.textContent = `${weekly.current}hrs`
    p.textContent = `Previous - ${weekly.previous}hrs`
  }
  div.monthly = () => {
    h1.textContent = `${monthly.current}hrs`
    p.textContent = `Previous - ${monthly.previous}hrs`
  }

  container.appendChild(div)
}

const removeActive = () => {
  buttons.forEach(x => {
    x.classList.remove('active')
  })
}

daily.addEventListener('click', () => {
  removeActive()
  daily.classList.add('active')
  const generatedCards = document.querySelectorAll('.card')
    generatedCards.forEach(x => {
      x.daily()
    })
})
weekly.addEventListener('click', () => {
  removeActive()
  weekly.classList.add('active')
  const generatedCards = document.querySelectorAll('.card')
  generatedCards.forEach(x => {
    x.weekly()
  })
})
monthly.addEventListener('click', () => {
  removeActive()
  monthly.classList.add('active')
  const generatedCards = document.querySelectorAll('.card')
  generatedCards.forEach(x => {
    x.monthly()
  })
})


