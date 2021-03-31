// Globals
const survivorsAPI = 'http://localhost:8080/api/survivors'
let globalSort = ''
let tribesArray = [[],[]]
let idRange = {minID: 0, length: 0}

// 
// FETCH, FILTER, AND SORT CARDS
// 

// FETCH SURVIVORS ON LOAD
fetchSurvivors(survivorsAPI + '?season_num=1')

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

// FETCH SURVIVORS FUNCTION
function fetchSurvivors(query){
  const survivorContainer = document.querySelector('#survivor_cards')
  survivorContainer.textContent = ""

  fetch(query)
  .then(res => res.json())
  .then(survivors => {
    idRange.minID = survivors[0].id
    idRange.length = survivors.length
    survivors.forEach(survivor => {
      const survivorCard = createNode('div', 'card')
      survivorCard.id = `surv_${survivor.id}`
      createLeftDiv(survivor, survivorCard)
      createRightDiv(survivor, survivorCard)
  
      survivorContainer.append(survivorCard)
    })
  })
}

// BUILD QUERY OPTIONS
function queryBuilder(id, queryParam){
  const el = document.querySelector(`#${id}`)
  return el.value ? `${queryParam}=${el.value}&` : ''
}

// 
// CREATE TRIBES
// 

// ADD SURVIVOR TO HOME TRIBE
const addSurvivorToTribe = (survivor, survivorCard) => {
  if(tribesArray[0].length < 6){
    tribesArray[0].push({id: survivor.id, name: survivor.name})
    survivorCard.remove()
    addAwaySurvivor()
  }else{
    alert("Your Tribe Is Full. You're Ready to Play!")
  }

}

// ADD SURVIVOR TO AWAY TRIBE
const addAwaySurvivor = () => {
  let awaySurv = (Math.floor(Math.random() * idRange.length) + idRange.minID)
  fetch(`${survivorsAPI}?id=${awaySurv}`)
    .then(res => res.json())
    .then(survivor => {
      tribesArray[1].push({id: survivor[0].id, name: survivor[0].name})
      let setCookie = JSON.stringify(tribesArray)
      document.cookie = `tribes=${setCookie}`
      updateTribesBar()
    })

  const survivorToRemoveID = document.querySelector(`#surv_${awaySurv}`)
  survivorToRemoveID.remove()
}

// 
// DOM MANIPULATIONS
// 

// UPDATE TRIBE BAR
const updateTribesBar = () => {
  const homeTribeBar = document.querySelector('#homeTribeBar')
  const awayTribeBar = document.querySelector('#awayTribeBar')

  homeTribeBar.firstElementChild.textContent = ''
  awayTribeBar.firstElementChild.textContent = ''

  createTribeListItem()
}

const createTribeListItem = () => {
  for(i = 0; i < 6; i++){
    if(tribesArray[0][i]){
      homeTribeBar.firstElementChild.innerHTML +=
        `<div class="flex justify-between text-lg my-2 p-2 bg-white-dark text-green-dark rounded-md font-bold uppercase" style="box-shadow: inset 0px 8px 15px rgba(0, 0, 0, 0.1);">
          <div class="" style="font-size: 15px">${tribesArray[0][i].name}</div><i class="fas fa-times text-base" style="padding: 5px 5px 0 0;"></i>
        </div>`
    }else{
      homeTribeBar.firstElementChild.innerHTML +=
      `<div class="flex justify-between text-lg my-2 p-2 bg-white-light rounded-md mb-2"  style="box-shadow: inset 0px 8px 15px rgba(0, 0, 0, 0.2); height: 42px;">
      </div>`
    }
  
    if(tribesArray[1][i]){
      awayTribeBar.firstElementChild.innerHTML +=
      `<div class="flex justify-between text-lg my-2 p-2 bg-white-dark text-green-dark rounded-md font-bold uppercase" style="box-shadow: inset 0px 8px 15px rgba(0, 0, 0, 0.1);">
        <div class="" style="font-size: 15px">${tribesArray[1][i].name}</div><i class="fas fa-times text-base" style="padding: 5px 5px 0 0;"></i>
      </div>`
    }else{
      awayTribeBar.firstElementChild.innerHTML +=
      `<div class="flex justify-between text-lg my-2 p-2 bg-white-light rounded-md mb-2"  style="box-shadow: inset 0px 8px 15px rgba(0, 0, 0, 0.2); height: 42px;">
      </div>`
    }
  }

  awayTribeBar.firstElementChild.innerHTML += `
  <div class="m-auto pb-4" style="font-size: 8px; width: fit-content">
  </div>
  `

  homeTribeBar.firstElementChild.innerHTML += `
  <div class="m-auto pb-4" style="font-size: 8px; width: fit-content">
  </div>
  `

  for(i = 0; i < 6; i++){
    if(tribesArray[0][i]){
      homeTribeBar.firstElementChild.lastElementChild.innerHTML +=
        `<i class="fas fa-circle text-xs pr-1 text-blue-light"></i>`
    }else{
      homeTribeBar.firstElementChild.lastElementChild.innerHTML +=
      `<i class="far fa-circle text-xs pr-1 text-blue-light"></i>`
    }
  
    if(tribesArray[1][i]){
      awayTribeBar.firstElementChild.lastElementChild.innerHTML +=
      `<i class="fas fa-circle text-xs pr-1 text-blue-light"></i>`
    }else{
      awayTribeBar.firstElementChild.lastElementChild.innerHTML +=
      `<i class="far fa-circle text-xs pr-1 text-blue-light"></i>`
    }
  }

  if(tribesArray[0][5]){
    const tribeMenu = document.querySelector('aside')
    button = createNode('button', 'btn')
    button.innerHTML = '<a href="/play">Play</a>'
    tribeMenu.append(button)
  }
}

// SHOW/HIDE TRIBE TABS
const tribesMenu = document.querySelector('#tribesMenu')
tribesMenu.addEventListener('click', (e) => {
  const homeTribeBar = document.querySelector('#homeTribeBar')
  const awayTribeBar = document.querySelector('#awayTribeBar')

  if(e.target.id === 'homeTribeTab'){
    if(homeTribeBar.classList.contains('hidden')){
      homeTribeBar.classList.remove('hidden')
      awayTribeBar.classList.add('hidden')
      e.target.style.boxShadow = "unset"
      e.target.nextElementSibling.style.boxShadow = "inset 5px 0 5px -6px #000, inset 0px -9px 5px -9px #000"
    }
  }

  if(e.target.id === 'awayTribeTab'){
    if(awayTribeBar.classList.contains('hidden')){
      awayTribeBar.classList.remove('hidden')
      homeTribeBar.classList.add('hidden')
      e.target.style.boxShadow = "unset"
      e.target.previousElementSibling.style.boxShadow = "inset -6px 0 5px -6px rgba(0,0,0,0.75), inset 0px -9px 5px -9px rgba(0,0,0,0.75)"
    }
  }

  if(e.target.classList.contains('fas')){
    e.target.parentNode.previousElementSibling.classList.toggle('hidden')
    e.target.classList.toggle('fa-angle-up')
    e.target.classList.toggle('fa-angle-down')
  }
})


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
  addButton.addEventListener('click', () => {addSurvivorToTribe(survivor, survivorCard)})
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