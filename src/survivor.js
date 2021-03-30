const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const survivorID = 'http://localhost:8080/api/survivors?id='

fetch(survivorID + id)
.then(res => res.json())
.then(survivor => {
  const section = document.querySelector('#survivor_bio')
  section.innerHTML = `
    Name: ${survivor[0].name}<br>
    Season Number: ${survivor[0].season_num}<br>
    Season: ${survivor[0].season}<br>
    Age: ${survivor[0].age}<br>
    Gender: ${survivor[0].gender}<br>
    State: ${survivor[0].state}<br>
    Style: ${survivor[0].style}<br>
    Days Played: ${survivor[0].days_played}<br>
    Exit Condition: ${survivor[0].exit_condition}<br>
    Final Vote: ${survivor[0].final_vote}<br>
    First Vote Accuracy: ${survivor[0].first_vote_accuracy}<br>
    Idols Found: ${survivor[0].idols_found}<br>
    Individual Immunity: ${survivor[0].ind_immunity}<br>
    Idols Played: ${survivor[0].idols_played}<br>
    Individual Wins: ${survivor[0].ind_wins}<br>
    Jury Member: ${survivor[0].jury_member}<br>
    Place: ${survivor[0].place}<br>
    Race: ${survivor[0].race}<br>
    Sexuality: ${survivor[0].sexuality}<br>
    Survivor Score: ${survivor[0].survivor_score}<br>
    Tribe: ${survivor[0].tribe}<br>
    Tribe Wins: ${survivor[0].tribe_wins}<br>
    Vote Accuracy: ${survivor[0].vote_accuracy}<br>
    Votes Against: ${survivor[0].votes_against}<br>
    ID: ${survivor[0].id}<br>
    `
    console.log(survivor[0])
})

