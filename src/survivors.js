// Globals
const survivorsAPI = 'http://localhost:8080/api/survivors'
let globalSort = ''

// FETCH SURVIVORS ON LOAD
fetchSurvivors(survivorsAPI)

// FILTER & SORT UPDATES
const survivorFinderBar = document.querySelector('#finder_bar')
survivorFinderBar.addEventListener('change', (e) => {

  seasonNum = queryBuilder('season_sort', 'season_num')
  style = queryBuilder('survivor_style', 'style')
  min = queryBuilder('minScore', 'min')
  max = queryBuilder('maxScore', 'max')

  if(e.target.parentElement.id === "survivor_sort"){
    globalSort = `sort=${e.target.value}`
  }
  
  query = survivorsAPI + '?' + seasonNum + style + min + max + globalSort

  fetchSurvivors(query)
})

// BUILD QUERY OPTIONS
function queryBuilder(id, queryParam){
  const el = document.querySelector(`#${id}`)
  return el.value ? `${queryParam}=${el.value}&` : ''
}

// FETCH SURVIVORS FUNCTION
function fetchSurvivors(query){
  const survivorContainer = document.querySelector('#survivor_cards')
  survivorContainer.textContent = ""

  fetch(query)
  .then(res => res.json())
  .then(survivors => survivors.forEach(survivor => {
    const survivorCard = createNode('div', 'card')

    createLeftDiv(survivor, survivorCard)
    createRightDiv(survivor, survivorCard)

    survivorContainer.append(survivorCard)
  }))
}

// HIDE FILTERS
const filterAside = document.querySelector('#finder_bar')
filterAside.addEventListener('click', (e) => {
  if(e.target.classList.contains('form-hider')){
    e.target.nextElementSibling.classList.toggle('hidden')
    e.target.lastChild.classList.toggle('fa-angle-up')
  }
})

// CREATE LEFT DIV - CARD
const createLeftDiv = (survivor, survivorCard) => {
  const leftDiv = createNode('div', 'left-card-col')

  const survivorImg = document.createElement('img')
  survivorImg.src = survivor.image

  const survivorName = createNode('h3')
  survivorName.textContent = survivor.name

  const survivorSeason = createNode('p')
  survivorSeason.textContent = survivor.season

  leftDiv.append(survivorImg, survivorName, survivorSeason)
  survivorCard.append(leftDiv)
}

// CREATE RIGHT DIV - CARD
const createRightDiv = (survivor, survivorCard) => {
  const rightDiv = document.createElement('div')
  rightDiv.classList.add('right-card-col')

  const topDiv = createNode('div', 'right-card-col-top')
  const topDivInner = createNode('div')
  topDivInner.innerHTML = `
    <p><strong>Season:</strong> ${survivor.season_num}</p>
    <p><strong>Accuracy:</strong> ${survivor.vote_accuracy}</p>
    <p><strong>Immunity:</strong> ${survivor.ind_immunity + survivor.idols_found}</p>
    <p><strong>Place:</strong> ${survivor.place}</p>
    <p><strong>Type:</strong> ${survivor.style}</p>
    <p><strong>Score:</strong> ${survivor.survivor_score}</p>
  `
  topDiv.append(topDivInner)

  const bottomDiv = createNode('div', 'right-card-col-bottom')
  const viewButton = createNode('button', 'btn')
  viewButton.innerHTML = `<a href="/survivor.html?id=${survivor.id}">VIEW</a>`
  const addButton = createNode('button', 'btn')
  addButton.textContent = 'ADD'
  bottomDiv.append(viewButton, addButton)

  rightDiv.append(topDiv, bottomDiv)

  survivorCard.append(rightDiv)
}

// CREATES NODE & CLASS
const createNode = (element, className) => {
  const el = document.createElement(element)
  el.classList.add(className)
  return el
}      