//Var & Const
const chart = document.getElementById('chart')
const btn = document.querySelector('button')
const gridder = document.querySelector('.grid-container')
const roundsRemaining = document.querySelector('#rounds-remaining')
const resetBtn = document.querySelector('#reset-btn')
let userMessage = document.querySelector('#user-message')
btn.addEventListener('click', turnUpdate)
resetBtn.addEventListener('click', resetGame)

const maxTurns = 4
const maxMoves = 3
let turncount = maxTurns
let playerMoves = {1: maxMoves, 2: maxMoves, 3: maxMoves}
let playerPower = {1: 0, 2: 0, 3: 0}

//----------------Event Listeners / Handlers
document.addEventListener('DOMContentLoaded', initializeDom)

function handleBoxClick(e){
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
function fetchPlayers(){
  return fetch('http://localhost:3000/users')
  .then(resp => resp.json())
}
function fetchPlayer(id) {
  return fetch(`http://localhost:3000/users/${id}`).then((resp) => resp.json())
}

function fetchTopics(){
  return fetch('http://localhost:3000/topics')
  .then(resp => resp.json())
}

function fetchUserTopics(){
  return fetch("http://localhost:3000/user_topics").then((resp) => resp.json())
}
function fetchCreateUserTopic(e){
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
  .then((json) => addUserTopicDataSetToBox(json, e))
}
function fetchDeleteUserTopic(e){
  const id = e.target.dataset.userTopicId
  const config = {
    method: "DELETE"
  }
  fetch(`http://localhost:3000/user_topics/${id}`, config)
}
function fetchDeleteUserTopics(arrayIds){
  arrayIds.forEach(function(id){
    fetch(`http://localhost:3000/user_topics/${id}`, {
      method: 'DELETE'
    })
  })
}
function deleteUserTopicsHandler(){
  return fetchUserTopics().then((json) => convertTopicOBJsToIdArray(json)).then((array) => fetchDeleteUserTopics(array))
}
function convertTopicOBJsToIdArray(user_topics){
  return joinArray = user_topics.map(function(user_topic){
    return user_topic.id
  })
}

//This is my mess
function fetchFollowerTopics(){
  return fetch("http://localhost:3000/follower_topics").then((resp) => resp.json())
}
function deleteFollowerTopics(joinArray){
  fetch(`http://localhost:3000/follower_topics/1`, {
    method: 'DELETE'
  })
}
function createFollowerTopics(){
  const config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }
  return fetch('http://localhost:3000/follower_topics', config)
  .then(response => response.json())
  // .then(function(obj) { console.log(obj) } )
}
function reseedData(obj){
  fetchFollowerTopics().then(joinArray => deleteFollowerTopics(joinArray)).then(createFollowerTopics())
}

//----------------Update DOM-------------
function initializeDom(){
  deleteUserTopicsHandler()
  roundsRemaining.innerText = `Rounds Remaining: ${turncount}`
  fetchPlayers().then(playerList => initializePlayers(playerList))
}
function initializePlayers(playerList){
  let i = 3;
  playerList.forEach(function(player){
    const playerDiv = document.createElement('div')
    const heading = document.createElement('h2')
    const turnCount = document.createElement('h4')
    const ul = document.createElement('ul')
    const br = document.createElement('br')
    heading.className = 'player-heading'
    heading.innerHTML = `Politician ${i}`
    turnCount.innerText = `Remaining Moves: ${playerMoves[i]}`
    turnCount.className = 'turn-count'
    if(i % 2 == 0) {
      playerDiv.className = `grid-item players right`
    } else {
      playerDiv.className = `grid-item players left`
    }
    playerDiv.dataset.id = player.id
    playerDiv.append(heading)
    playerDiv.append(turnCount)
    playerDiv.append(br)
    playerDiv.append(ul)
    gridder.prepend(playerDiv)
    i -= 1
  })

  initializeTopics()
}

//Legacy program.
//******************************************
//************** DO NOT TOUCH **************
//******************************************
// function displayPlayers(){
//   deleteJoinHandler()
//   roundsRemaining.innerText = `Rounds Remaining: ${turncount}`
//   let i = 3;
//   fetchPlayers().then(function(playerList){
//     playerList.forEach(function(player){
//       const playerDiv = document.createElement('div')
//       const heading = document.createElement('h2')
//       const ul = document.createElement('ul')
//       const br = document.createElement('br')
//       heading.className = 'player-heading'
//       heading.innerHTML = `Politican ${i}`
//       if(i % 2 == 0) {
//         playerDiv.className = `grid-item players right`
//       } else {
//         playerDiv.className = `grid-item players left`
//       }
//       playerDiv.dataset.id = player.id
//       playerDiv.append(heading)
//       playerDiv.append(br)
//       playerDiv.append(ul)
//       gridder.prepend(playerDiv)
//       i -= 1
//     })
//     displayTopics()
//   })
// }


function initializeTopics(){
  fetchTopics().then(slapInitTopicsToDOM)
}
function slapInitTopicsToDOM(topics){
  const playerDivs = document.querySelectorAll('.players')
  playerDivs.forEach(function(playerDiv, i){
    const ul = playerDiv.querySelector('ul')
    ul.addEventListener('click', handleBoxClick)
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
function addUserTopicDataSetToBox(json, e) {
  e.target.dataset.userTopicId = json.id
}


function updatePlayerPowerInSpan(){
  const spans = document.querySelectorAll('span')
  spans.forEach(function(span){
    let id = span.id.slice(6)
    span.innerHTML = playerPower[id]
  })
}
function updatePlayerPowerInChart(){
  for (let i = 1; i < 4; i++){
    fetchPlayer(i).then(function(player){
      playerPower[i] = 0
      player.followers.forEach(function(followers){
        playerPower[i] += followers.followers_for_topic.length
      })
    }).then(() => updatePlayerPowerInSpan());
  }
}
function resetPlayerPowerInSpan(){
  const spans = document.querySelectorAll('span')
  spans.forEach(function(span){
    span.innerHTML = "0"
  })
}
function talkToUser(str) {
  userMessage.innerText = str
}
function alertUserTurnCount(e){
  e.target.checked = false
  alert("Sorry you have used all of your turns for this round.")
}


function resetCheckBoxes(){
  const checkboxes = document.querySelectorAll('input')
  checkboxes.forEach(function(box){
    box.checked = false
    box.value = "on"
  })
}

//----------------Logic
function turnUpdate(){
  if (turncount > 0) {
    turncount -= 1;
    resetMoves()

    const h4s = document.querySelectorAll('h4')
    h4s.forEach(function(h4){
      h4.innerText = `Remaining Moves: ${maxMoves}`
    })

    turnCountToDOM()
    updatePlayerPowerInChart()
  } else {
    gameOver()
  }
}

function resetMoves(){
  playerMoves[1] = maxMoves
  playerMoves[2] = maxMoves
  playerMoves[3] = maxMoves
}


function turnCountToDOM(){
  roundsRemaining.innerText = `Rounds Remaining: ${turncount}`
}

function turnAction(e, id){
  const h4s = document.querySelectorAll('h4')
  if (e.target.value === "on" ){
    // debugger
    fetchCreateUserTopic(e)
    playerMoves[id] -= 1
    h4s[e.target.id.slice(-1) -1].innerText = `Remaining Moves: ${playerMoves[id]}`
    e.target.value = "off"
  } else {
    fetchDeleteUserTopic(e)
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

function resetGame(){
  turncount = maxTurns;
  playerMoves = {1: maxMoves, 2: maxMoves, 3: maxMoves}
  playerPower = {1: 0, 2: 0, 3: 0}

  resetCheckBoxes()
  turnCountToDOM()
  deleteUserTopicsHandler()
  resetPlayerPowerInSpan()
  reseedData()
}
