

//Var & Const

//Event Listeners / Handlers
document.addEventListener('DOMContentLoaded', displayPlayers)

function topicHandler(e){
  if (e.target.value === "on"){
    fetchCreateTopic(e)
    // .then(displayPlayers(json))
  } else {
    fetchDeleteTopic(e)
    // .then(displayPlayers(json))
  }
}

//Fetch
function fetchTopics(){
  return fetch('http://localhost:3000/topics')
  .then(resp => resp.json())
}

function fetchCreateTopic(e){
  const config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      topic_id: `${e.target.dataset.id}`,
      user_id: `${e.target.parentElement.parentElement.parentElement.dataset.id}`
    })
  }
  return fetch('http://localhost:3000/user_topics', config)
  // .then(resp => resp.json)
}

function fetchDeleteTopic(e){

}

function fetchPlayers(){
  return fetch('http://localhost:3000/users')
  .then(resp => resp.json())
}

//Update DOM
function passTopicsToDOM(){
  // fetchTopics().then(json => displayTopics(json))
  fetchTopics().then(slapTopicsToDOM)
}

function slapTopicsToDOM(topics){
  const players = document.querySelectorAll('.players')
  Array.from(players).forEach(function(playerDiv, i){
    const ul = playerDiv.querySelector('ul')
    ul.addEventListener('click', topicHandler)
    topics.forEach(function(topic){
      const li = document.createElement('li')
      const checkbox = document.createElement('input')
      li.innerHTML = topic.title
      checkbox.type = "checkbox"
      checkbox.id = `${topic.title} p${i+1}`
      checkbox.dataset.id = topic.id
      li.append(checkbox)
      ul.append(li)

    })
  })
}

function displayTopics(){
  passTopicsToDOM()
}

function displayPlayers(){
  fetchPlayers().then(function(playerList){
    playerList.forEach(function(player){

      const playerDiv = document.createElement('div')
      const heading = document.createElement('h2')
      const ul = document.createElement('ul')
      heading.innerHTML = `Player ${player.user_name}`
      playerDiv.className = "players"
      playerDiv.dataset.id = player.id
      playerDiv.append(heading)
      playerDiv.append(ul)
      document.body.prepend(playerDiv)
    })
    displayTopics()
  })
}

//Logic
