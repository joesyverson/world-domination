//Var & Const
const chart = document.getElementById('chart')
const btn = document.querySelector('button')
btn.addEventListener('click', turnUpdate)
let turncount = 5;
let p1 = 5
let p2 = 5
let p3 = 5
let playerPower = {1: 0, 2: 0, 3: 0}

//----------------Event Listeners / Handlers
document.addEventListener('DOMContentLoaded', displayPlayers)

function topicHandler(e){
  const playerID = e.target.parentElement.parentElement.parentElement.dataset.id
  if (playerID === "1" && p1 > 0){
    if (e.target.value === "on" ){
      fetchCreateTopic(e)
      p1 = p1 - 1
      // .then(displayPlayers(json))
      e.target.value = "off"
    } else {
      fetchDeleteTopic(e)
      // .then(displayPlayers(json))
      e.target.value = "on"
    }
  } else if (playerID === "2" && p2 > 0) {
    if (e.target.value === "on" ){
      fetchCreateTopic(e)
      p2 = p2 - 1
      // .then(displayPlayers(json))
      e.target.value = "off"
    } else {
      fetchDeleteTopic(e)
      // .then(displayPlayers(json))
      e.target.value = "on"
    }
  } else if (playerID === "3" && p3 > 0) {
    if (e.target.value === "on" ){
      fetchCreateTopic(e)
      p3 = p3 - 1
      // .then(displayPlayers(json))
      e.target.value = "off"
    } else {
      fetchDeleteTopic(e)
      // .then(displayPlayers(json))
      e.target.value = "on"
    }
  } else {
    alertUserTurnCount(e)
  }
}

//----------------Fetch
function fetchTopics(){
  return fetch('http://localhost:3000/topics')
  .then(resp => resp.json())
}

function fetchCreateTopic(e){
  // debugger
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
  // debugger
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

//----------------Update DOM-------------
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
  turncount -= 1;
  p1 = 5
  p2 = 5
  p3 = 5

  for (let i = 1; i < 4; i++){
    getFollowers(i).then(function(json){
      playerPower[i] = json.followers.length
    }).then(() => displayChart());
  }
}
