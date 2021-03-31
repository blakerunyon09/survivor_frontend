const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const survivorID = 'http://localhost:8080/api/survivors?id='

fetch(survivorID + id)
.then(res => res.json())
.then(survivor => {
    // ATTACH NAME TO HERO BANNER
    document.querySelector('#hero').firstElementChild.textContent = survivor[0].name
    
    // CREATE PROFILE BODY
    survivorBoby = `
      <section class="flex flex-col md:flex-row justify-center mt-4 mb-12 w-full">
        <div class="text-2xl text-green-dark">
          <img class="rounded-lg" src="${survivor[0].image}">
          <h1 class="font-bold text-4xl my-6">${survivor[0].name}</h1>
          <div class="text-xl text-green-dark">
            <p class="font-bold text-2xl my-8">Demographics:</p>
              <p class="ml-4 mt-2">Season: ${survivor[0].season} ${survivor[0].season_num}</p>
              <p class="ml-4 mt-2">State: ${survivor[0].state}</p>
              <p class="ml-4 mt-2">Style: ${survivor[0].style}</p>
          </div>
          <div class="text-xl text-green-dark">
              <p class="font-bold text-2xl my-8">Demographics:</p>
                <p class="ml-4 mt-2">State: ${survivor[0].state}</p>
                <p class="ml-4 mt-2">Style: ${survivor[0].style}</p>
                <p class="ml-4 mt-2">Race: ${survivor[0].race}</p>
                <p class="ml-4 mt-2">Sexuality: ${survivor[0].sexuality}</p>
          </div>
        </div>
        <div class="md:ml-20 text-xl text-green-dark">
          <p class="font-bold text-2xl mb-8">Demographics:</p>
            <p class="ml-4 mt-2">State: ${survivor[0].state}</p>
            <p class="ml-4 mt-2">Style: ${survivor[0].style}</p>
            <p class="ml-4 mt-2">Race: ${survivor[0].race}</p>
            <p class="ml-4 mt-2">Sexuality: ${survivor[0].sexuality}</p>
          <p class="font-bold text-2xl my-8">Tribe Stats:</p>
            <p class="ml-4 mt-2">Tribe: ${survivor[0].tribe}</p>
            <p class="ml-4 mt-2">Tribe Wins: ${survivor[0].tribe_wins}</p>
          <p class="font-bold text-2xl my-8">Attributes:</p>
            <p class="ml-4 mt-2">Days Played: ${survivor[0].days_played}</p>
            <p class="ml-4 mt-2">Exit Condition: ${survivor[0].exit_condition}</p>
            <p class="ml-4 mt-2">Idols Found: ${survivor[0].idols_found}</p>
            <p class="ml-4 mt-2">Individual Immunity: ${survivor[0].ind_immunity}</p>
            <p class="ml-4 mt-2">Idols Played: ${survivor[0].idols_played}</p>
            <p class="ml-4 mt-2">Individual Wins: ${survivor[0].ind_wins}</p>
            <p class="ml-4 mt-2">Place: ${survivor[0].place}</p>
            <p class="ml-4 mt-2">Survivor Score: ${survivor[0].survivor_score}</p>
          <p class="font-bold text-2xl my-8">Voting Record:</p>
            <p class="ml-4 mt-2">First Vote Accuracy: ${survivor[0].first_vote_accuracy ? "Yes" : "No"}</p>
            <p class="ml-4 mt-2">Vote Accuracy: ${survivor[0].vote_accuracy}</p>
            <p class="ml-4 mt-2">Votes Against: ${survivor[0].votes_against}</p>
            <p class="ml-4 mt-2">Jury Member: ${survivor[0].jury_member ? "Yes" : "No"}</p>
            <p class="ml-4 mt-2">Final Vote: ${survivor[0].final_vote}</p>
        </div>
      </section>
      <section class="flex flex-col flex-wrap md:flex-row justify-center mt-12 w-full">
        <h6 class="w-full text-center text-blue-dark font-bold text-4xl my-6">Similar Survivors</h6>
        <div id="related_survivors" class="flex flex-col md:flex-row"></div>
      </section>
    `
    // GRAB AND APPEND BODY
    const body = document.querySelector('#survivor_bio')
    body.innerHTML = survivorBoby


    const relSurvivors = document.querySelector('#related_survivors')

    fetch(`http://localhost:8080/api/survivors?style=${survivor[0].style}`)
      .then(res => res.json())
      .then(relatedSurvivors => {
        for(let i = 0; i < 3; i++){
          let randNum = (Math.floor(Math.random() * relatedSurvivors.length))
          let ranSurv = relatedSurvivors[randNum]

          const survivorCard = createNode('div', 'card')
          survivorCard.id = `surv_${survivor.id}`
          createLeftDiv(ranSurv, survivorCard)
          createRightDiv(ranSurv, survivorCard)
      
          relSurvivors.append(survivorCard)
      }})
})

// CREATES NODE & CLASS
const createNode = (element, className) => {
  const el = document.createElement(element)
  el.classList.add(className)
  return el
}      

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
  bottomDiv.append(viewButton)

  rightDiv.append(topDiv, bottomDiv)

  survivorCard.append(rightDiv)
}

