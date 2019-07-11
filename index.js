//Var & Const
const chart = document.getElementById('chart')
const btn = document.querySelector('button')
const gridder = document.querySelector('.grid-container')
const roundsRemaining = document.querySelector('#rounds-remaining')
btn.addEventListener('click', turnUpdate)
const maxTurns = 4
let userMessage = document.querySelector('#user-message')

let turncount = maxTurns
const maxMoves = 3
let playerMoves = {1: maxMoves, 2: maxMoves, 3: maxMoves}
let playerPower = {1: 0, 2: 0, 3: 0}

//----------------Event Listeners / Handlers
document.addEventListener('DOMContentLoaded', displayPlayers)

function topicHandler(e){
  const playerID = e.target.parentElement.parentElement.parentElement.dataset.id
  if (playerID === "1"){
    if (playerMoves[1] > 0){
      turnAction(e, playerID)
    } else {
      alertUserTurnCount(e)
    }
  } else if (playerID === "2") {
    if (playerMoves[2] > 0){
      turnAction(e, playerID)
    } else {
      alertUserTurnCount(e)
    }
  } else if (playerID === "3") {
    if (playerMoves[3] > 0){
      turnAction(e, playerID)
    } else {
      alertUserTurnCount(e)
    }
  }
}

//----------------Fetch
function fetchTopics(){
  return fetch('http://localhost:3000/topics')
  .then(resp => resp.json())
}

function fetchCreateTopic(e){
  const config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      topic_id: `${e.target.dataset.topicid}`,
      user_id: `${e.target.parentElement.parentElement.parentElement.dataset.id}`
    })
  }
  return fetch('http://localhost:3000/user_topics', config)
    .then(response => response.json())
  .then((json) => createUserTopicData(json, e))
}

function fetchDeleteTopic(e){
  const id = e.target.dataset.userTopicId
  const config = {
    method: "DELETE"
  }
    fetch(`http://localhost:3000/user_topics/${id}`, config)
}

function fetchPlayers(){
  return fetch('http://localhost:3000/users')
  .then(resp => resp.json())
}

function fetchPlayer(id) {
  return fetch(`http://localhost:3000/users/${id}`).then((resp) => resp.json())
}

function getFollowers(index){
  return fetchPlayer(index)
}

function fetchJoins(){
  return fetch("http://localhost:3000/user_topics").then((resp) => resp.json())
}

function joinIdArray(user_topics){
  return joinArray = user_topics.map(function(user_topic){
    return user_topic.id
  })
}

function deleteJoins(arrayIds){
  arrayIds.forEach(function(id){
    fetch(`http://localhost:3000/user_topics/${id}`, {
      method: 'DELETE'
    })
  })
}

function deleteJoinHandler(){
  return fetchJoins().then((json) => joinIdArray(json)).then((array) => deleteJoins(array))
}

//----------------Update DOM-------------

function talkToUser(str) {
  userMessage.innerText = str
}

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
      checkbox.dataset.topicid = topic.id
      checkbox.dataset.userTopicId = 0
      li.append(checkbox)
      ul.append(li)
    })
  })
}

function displayTopics(){
  passTopicsToDOM()
}

function displayPlayers(){
  deleteJoinHandler()
  roundsRemaining.innerText = `Rounds Remaining: ${turncount}`
  fetchPlayers().then(function(playerList){
    playerList.forEach(function(player){

      const playerDiv = document.createElement('div')
      const heading = document.createElement('h2')
      const ul = document.createElement('ul')
      heading.innerHTML = `Player ${player.user_name}`
      playerDiv.className = "grid-item players"
      playerDiv.dataset.id = player.id
      playerDiv.append(heading)
      playerDiv.append(ul)
      gridder.prepend(playerDiv)

    })
    displayTopics()
  })
}

function createUserTopicData(json, e) {
  e.target.dataset.userTopicId = json.id
}

function alertUserTurnCount(e){
  e.target.checked = false
  alert("Sorry you have used all of your turns for this round.")
}

function displayChart(){
  const spans = document.querySelectorAll('span')
  spans.forEach(function(span){
    let id = span.id.slice(6)
    span.innerHTML = playerPower[id]
  })
}

//----------------Logic
function turnUpdate(){

  if (turncount > 0) {
    turncount -= 1;
    playerMoves[1] = maxMoves
    playerMoves[2] = maxMoves
    playerMoves[3] = maxMoves

    roundsRemaining.innerText = `Rounds Remaining: ${turncount}`
    for (let i = 1; i < 4; i++){
      getFollowers(i).then(function(json){
        playerPower[i] = json.followers.length
      }).then(() => displayChart());
    }
  } else {
    gameOver()
  }
}

function turnAction(e, id){
  if (e.target.value === "on" ){
    fetchCreateTopic(e)
    playerMoves[id] -= 1
    e.target.value = "off"
  } else {
    fetchDeleteTopic(e)
    e.target.value = "on"
  }
}

function gameOver(){
  if(playerPower[1] > playerPower[2] && playerPower[1] > playerPower[3]) {
    talkToUser('Winner: Player 1')
  } else if (playerPower[2] > playerPower[1] && playerPower[2] > playerPower[3]) {
    talkToUser('Winner: Player 2')
  } else if(playerPower[3] > playerPower[1] && playerPower[3] > playerPower[2]) {
    talkToUser('Winner: Player 3')
  } else if(playerPower[2] === playerPower[3] === playerPower[1]) {
    talkToUser('Three player draw')
  } else if (playerPower[1] === playerPower[2]) {
    talkToUser('Draw: Player 1 and Player 2')
  } else if (playerPower[1] === playerPower[3]) {
    talkToUser('Draw: Player 1 and Player 3')
  } else if (playerPower[2] === playerPower[3]) {
    talkToUser('Draw: Player 2 and Player 3')
  }
}

function resetGame
