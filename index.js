

//Var & Const

//Event Listeners
document.addEventListener('DOMContentLoaded', displayTopics)

//Fetch
function  fetchTopics(){
  return fetch('http://localhost:3000/topics')
  .then(resp => resp.json())
}

//Update DOM
function passTopicsToDOM(){
  // fetchTopics().then(json => displayTopics(json))
  fetchTopics().then(slapTopicsToDOM)
}

function slapTopicsToDOM(topics){
  const players = document.getElementsByClassName('player')
  Array.from(players).forEach(function(player, i){
    player.innerHTML += `<h2> Player ${i+1} </h2 >`

    topics.forEach(function(topic){
      player.innerHTML += `
          <li> ${topic.title} </li>
      `
    })
  })
}

function displayTopics(){
  passTopicsToDOM()
}


//Logic
