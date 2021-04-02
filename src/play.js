storage = localStorage.getItem('tribes').split(',')
let tribesList = []
let dayCount = 1
homeWin = null

fetch('http://localhost:8080/api/play',{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({"id": storage})
})
.then(res => res.json())
.then(handleSurvs)

function handleSurvs(data){
  let cha = []
  data.forEach((survivor,i) => {cha[i] = survivor})

  const continueButton = document.querySelector('#continueButton')
  continueButton.addEventListener('click', addNewDay)

  function addNewDay(){
    const dayContainer = document.querySelector('#dayContainer')
    let newDay = createDay(cha)
    dayContainer.append(newDay)
  }

  preMergeTribeList(data) 
}

const createDay = (survivors) => {
  const div = createNode('div','singleDay')
  
  dayCount % 3 === 0 ? dayCount += 2 : dayCount += 1
  let tribalCouncil = dayCount % 3 === 0
  if(!tribalCouncil){
    coinFlip = Math.random() > 0.5 ? true : false

    homeAdvantageCount = 0
    awayAdvantageCount = 0
    survivors.forEach((survivors,i) => i < 6 && survivors.status === "In Game" ? homeAdvantageCount += survivors.tribe_wins:'')
    survivors.forEach((survivors,i) => {if(i < 6 && survivors.status === "In Game"){
      if(coinFlip){
        survivors.style === "Athletic" ? homeAdvantageCount += 2 : ''
      }else{
        survivors.style === "Strategic" ? homeAdvantageCount += 2 : ''
      }
    }})
    survivors.forEach((survivors,i) => i > 6 && survivors.status === "In Game" ? awayAdvantageCount += survivors.tribe_wins:'')
    survivors.forEach((survivors,i) => {if(i > 6 && survivors.status === "In Game"){
      if(coinFlip){
        survivors.style === "Athletic" ? awayAdvantageCount += 2 : ''
      }else{
        survivors.style === "Strategic" ? awayAdvantageCount += 2 : ''
      }
    }})

    survivors.forEach((survivors,i) => i > 6 && survivors.status === "In Game"  ? awayAdvantageCount += survivors.tribe_wins:'')
    survivors.forEach((survivors,i) => {if(i > 6 && survivors.status === "In Game" ){
      if(coinFlip){
        survivors.style === "Athletic" ? awayAdvantageCount += 2 : ''
      }else{
        survivors.style === "Strategic" ? awayAdvantageCount += 2 : ''
      }
    }})

    avgHomeAdvantage = awayAdvantageCount/6
    avgAwayAdvantage = homeAdvantageCount/6

    homeWin = (avgHomeAdvantage - avgAwayAdvantage) > 0

    div.id = `day_${dayCount}`
    const dayLink = document.querySelector('#dayLink')
    dayLink.href = `/play.html#day_${dayCount}`

    const title1 = createNode('div','dayHeader')
    const title2 = createNode('div','dayHeader')
    const title3 = createNode('div','dayHeader')

    title2.classList.add('pt-20')
    title3.classList.add('pt-10')

    title1.textContent = `DAY ${dayCount}`
    title2.textContent = "TRIBAL"
    title3.textContent = "CHALLENGE"

    const bodyCopy = createNode('div','dayDescription')

    bodyCopy.textContent = `Today the tribes were faced with a ${coinFlip ? "physical" : "puzzle"} challenge. The ${homeWin ? 'KORRO' : 'BALBOA'} tribe won the challenge and went home with reward and tribal immunity. That means tomorrow ${homeWin ? 'the' : 'your'} ${homeWin ? 'BALBOA' : ''} tribe will be sending someone home. ${homeWin ? 'Great Job!' : 'See you at tribal.'}`

    div.append(title1, title2, title3, bodyCopy) 
    return div
  }
  else if(tribalCouncil){
    // if(homeWin){
    //   survivors.find((survivor) => {if(i > 6 && survivors.status === "In Game" ){lowestSurv.survivor_score < survivor.survivor_score}})
    //   console.log(lowestSurv)
    // }
    // else if(!homeWin){

    // }

    div.id = `day_${dayCount}`
    const dayLink = document.querySelector('#dayLink')
    dayLink.href = `/play.html#day_${dayCount}`



    const title1 = createNode('div','dayHeader')
    const title2 = createNode('div','dayHeader')
    const title3 = createNode('div','dayHeader')

    title2.classList.add('pt-20')
    title3.classList.add('pt-10')

    title1.textContent = `DAY ${dayCount}`
    title2.textContent = "TRIBAL"
    title3.textContent = "COUNCIL"

    const bodyCopy = createNode('div','dayDescription')

    bodyCopy.textContent = `Tonight the ${homeWin ? "BALBOA" : "KORRO"} tribe went to tribal council. It was a contentious night at tribal. Alliances were forged, trust was broken, and lines were drawn. Once the votes were counted _____ was sent home. One thing is clear, ${homeWin ? "BALBOA" : "KORRO"} has to find a way to come together or they'll be at tribal again very soon.`

    div.append(title1, title2, title3, bodyCopy)
    return div
  }
  preMergeTribeList(survivors)
}

const preMergeTribeList = (survivors) => {
  survivors.forEach(survivor => survivor.status = "In Game")
  const homeTribe = survivors.splice(-6)
  const awayTribe = survivors.splice(0, 6)
  const tribesContainer = document.querySelector('#tribesContainer')
  tribesContainer.innerHTML = ''
  const homeTribeBox = createTribeBox('KORRO', homeTribe)
  const awayTribeBox = createTribeBox('BALBOA', awayTribe)
  
  awayTribeBox.classList.add('pt-12')

  tribesContainer.append(homeTribeBox, awayTribeBox)
}

const createTribeBox = (name, tribeArray) => {
      const tribeBox = createNode('div')
      tribeBox.id = `${name.toLowerCase()}TribeContainer`
    
      let tribeName = createNode('div', 'tribeName')
      tribeName.textContent = name
      
      tribeBox.append(tribeName)

      tribeArray.forEach(survivor => {
        createSurvivorCard(survivor, tribeBox)
      })

      return tribeBox
}

const createSurvivorCard = (survivor, tribeBox) => {
  const card = createNode('div', 'survCard')
  card.innerHTML = `
    <img class="h-14 mr-2" src="${survivor.image}">
    <div>
      <p class="bigText">${survivor.name}</p>
      <p class="smallText">Score: ${survivor.survivor_score}</p>
    </div>
  `
  if(survivor.status === "In Game"){
    card.classList.add('color-gb')
  }else{
    card.classList.remove('color-gb')
    card.classList.add('color-gr')
  }
  tribeBox.append(card)
}

// CREATES NODE & CLASS
const createNode = (element, className) => {
  const el = document.createElement(element)
  if(className){el.classList.add(className)}
  return el
}      

// localStorage.clear()


// 0: {id: 14555, name: "Sonja Christopher", age: 63, state: "California", gender: "Female", …}
// 1: {id: 14556, name: "B.B. Andersen", age: 64, state: "Kansas", gender: "Male", …}
// 2: {id: 14557, name: "Stacey Stillman", age: 27, state: "San Francisco", gender: "Female", …}
// 3: {id: 14558, name: "Ramona Gray", age: 29, state: "New Jersey", gender: "Female", …}
// 4: {id: 14559, name: "Dirk Been", age: 23, state: "Wisconsin", gender: "Male", …}
// 5: {id: 14560, name: "Joel Klug", age: 27, state: "Arkansas", gender: "Male", …}
// 6: {id: 14562, name: "Greg Buis", age: 24, state: "Colorado", gender: "Male", …}
// 7: {id: 14565, name: "Colleen Haskell", age: 23, state: "Miami", gender: "Female", …}
// 8: {id: 14566, name: "Sean Kenniff", age: 30, state: "New York", gender: "Male", …}
// 9: {id: 14568, name: "Rudy Boesch", age: 72, state: "Virginia", gender: "Male", …}
// 10: {id: 14569, name: "Kelly Wigglesworth", age: 22, state: "California", gender: "Female", …}
// 11: {id: 14570, name: "Richard Hatch", age: 39, state: "Rhode Island", gender: "Male", …}


{/* <div class="survCard color-gb">
<div class="h-14 w-14 mr-2 bg-brown">:D</div>
<div>
  <p class="bigText">Rubpert Balboa</p>
  <p class="smallText">Score: 84</p>
</div>
</div> */}