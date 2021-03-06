const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("startButton");
var startAnimation = new TimelineMax({ repeat: 0 });
var questionTitle = document.getElementById("questionTitle")
var aAnswer = document.getElementById("aButton")
var bAnswer = document.getElementById("bButton")
var cAnswer = document.getElementById("cButton")
var dAnswer = document.getElementById("dButton")

let ws = new WebSocket("ws://localhost:3000")

ws.onmessage = message => {
  const response = JSON.parse(message.data)
  console.log(response)

  if (response.type === 'LOBBY_UPDATE'){
    var completeList = document.getElementById("readyList")
    var playersList = response.message

    completeList.innerHTML = ''
    playersList.forEach(player => {
      const playerStatus =  player.status === "ready"? " está pronto" : " não está pronto"
      completeList.innerHTML += "<li>" + player.name + playerStatus +  "</li>"
    });
  }

  if (response.type === 'QUESTION_UPDATE'){

    setTimer()

    hideWaitingQuestion()

    showQuestion()

    clearQuestion()

    handleQuestion(response)

  }

  if (response.type === 'GAME_RESULT'){
    hideResponse()
    hideWaitingQuestion()

    var completeList = document.getElementById("rankingList")
    var playersList = response.message

    completeList.innerHTML = ''
    playersList.forEach(player => {
      completeList.innerHTML += "<li>" + player.name + " fez " + player.score + " pontos </li>"
    });

    showRanking()

    console.log('Jogo terminou')
  }
}

startButton.onclick = function () {
  if (nameInput.value !== '') {
    const payLoad = {
      name: nameInput.value
    }

    ws.send(JSON.stringify(payLoad))

    startQuizAnimation()

  } else {
    alert("Digite um nome!")
  }
};

restartButton.onclick = function () {
  hideRanking()
  hideWaitingQuestion()
  startQuizAnimation()
  showReadyList()
}

readyButton.onclick = function () {
  const payLoad = {
    status: "ready"
  }

  ws.send(JSON.stringify(payLoad))

  readyAnimation()
};

aButton.onclick = function () {
  const payLoad = {
    questionResponse: "a"
  }

  ws.send(JSON.stringify(payLoad))

  handleResponse()
}

bButton.onclick = function () {
  const payLoad = {
    questionResponse: "b"
  }

  ws.send(JSON.stringify(payLoad))

  handleResponse()
}

cButton.onclick = function () {
  const payLoad = {
    questionResponse: "c"
  }

  ws.send(JSON.stringify(payLoad))

  handleResponse()
}

dButton.onclick = function () {
  const payLoad = {
    questionResponse: "d"
  }

  ws.send(JSON.stringify(payLoad))

  handleResponse()
}

clearQuestion = () => {
  questionTitle.innerHTML = ''
  aAnswer.innerHTML = ''
  bAnswer.innerHTML = ''
  cAnswer.innerHTML = ''
  dAnswer.innerHTML = ''
}

handleQuestion = (response) => {
  questionTitle.innerHTML += response.message.question
  aAnswer.innerHTML += response.message.responses.a
  bAnswer.innerHTML += response.message.responses.b
  cAnswer.innerHTML += response.message.responses.c
  dAnswer.innerHTML += response.message.responses.d
}

hideResponse = () => {
  startAnimation.to(question, 1, { alpha: 0 });
  startAnimation.to(question, 0.1, {css: { display: "none" }});
}

handleResponse = () => {
  hideResponse()

  startAnimation.to(waitingQuestion, 0.1, {css: { display: "grid" }});
  startAnimation.to(waitingQuestion, 1, { alpha: 1 });
}

hideWaitingQuestion = () => {
  startAnimation.to(waitingQuestion, 1, { alpha: 0 });
  startAnimation.to(waitingQuestion, 0.1, {css: { display: "none" }});
}

showQuestion = () => {
  startAnimation.to(waitingPlayers, 1, { alpha: 0 });
  startAnimation.to(waitingPlayers, 0.1, {css: { display: "none" }});

  startAnimation.to(readyList, 1, { alpha: 0 });
  startAnimation.to(readyList, 0.1, {css: { display: "none" }});

  startAnimation.to(question, 0.1, {css: { display: "grid" }});
  startAnimation.to(question, 1, { alpha: 1 });
}

showReadyList = () => {
  startAnimation.to(readyList, 0.1, {css: { display: "grid" }});
  startAnimation.to(readyList, 1, { alpha: 1 });

  var completeList = document.getElementById("readyList")
  completeList.innerHTML = ''
}

showWaitingPlayers = () => {
  startAnimation.to(waitingPlayers, 0.1, {css: { display: "grid" }});
  startAnimation.to(waitingPlayers, 1, { alpha: 1 });
}

showRanking = () => {
  startAnimation.to(ranking, 0.1, {css: { display: "grid" }});
  startAnimation.to(ranking, 1, { alpha: 1 });
}

hideRanking = () => {
  startAnimation.to(ranking, 1, { alpha: 0 });
  startAnimation.to(ranking, 0.1, {css: { display: "none" }});
}

startQuizAnimation = () => {
  startAnimation.to(card, 1, { alpha: 0 });
  startAnimation.to(card, 0.1, {css: { display: "none" }});

  startAnimation.to(waiting, 0.1, {css: { display: "grid" }});
  startAnimation.to(waiting, 1, { alpha: 1 });
}

readyAnimation = () => {
  startAnimation.to(waiting, 1, { alpha: 0 });
  startAnimation.to(waiting, 0.1, {css: { display: "none" }});

  startAnimation.to(waitingPlayers, 0.1, {css: { display: "grid" }});
  startAnimation.to(waitingPlayers, 1, { alpha: 1 });
}

// timer

var counter = 30;
var timer = document.querySelector('#timer');

setTimer = () => {
  counter = 30;
  formatTimer();
  let intervalId = setInterval(() => {
    counter -= 1;
    formatTimer();
    if(counter === 0) {
      clearInterval(intervalId)
    }
  }, 1000)
}

formatTimer = () => {
  var hours = Math.floor(counter / 3600);
  var minutes = Math.floor((counter - (hours * 3600)) / 60);
  var seconds = counter - (hours * 3600) - (minutes * 60);

  timer.innerHTML = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}
