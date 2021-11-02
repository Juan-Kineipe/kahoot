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
    console.log('Atualizar lista de jogadores')
    var completeList = document.getElementById("readyList")
    var playersList = response.message

    completeList.innerHTML = ''
    playersList.forEach(player => {
      const playerStatus =  player.status === "ready"? " está pronto" : " não está pronto"
      completeList.innerHTML += "<li>" + player.name + playerStatus +  "</li>"
    });
  }

  if (response.type === 'QUESTION_UPDATE'){
    console.log('mostra pergunta')

    hideWaitingQuestion()

    showQuestion()

    clearQuestion()

    handleQuestion(response)

  }
}

startButton.onclick = function () {
  if (nameInput.value !== '') {
    console.log("Conecta com server e começa o jogo");
    const payLoad = {
      name: nameInput.value
    }

    ws.send(JSON.stringify(payLoad))

    startAnimation.to(card, 1, { alpha: 0 });
    startAnimation.to(card, 0.1, {css: { display: "none" }});

    startAnimation.to(waiting, 0.1, {css: { display: "grid" }});
    startAnimation.to(waiting, 1, { alpha: 1 });

  } else {
    alert("Digite um nome!")
  }
};

readyButton.onclick = function () {
  const payLoad = {
    status: "ready"
  }

  ws.send(JSON.stringify(payLoad))

  startAnimation.to(waiting, 1, { alpha: 0 });
  startAnimation.to(waiting, 0.1, {css: { display: "none" }});

  startAnimation.to(waitingPlayers, 0.1, {css: { display: "grid" }});
  startAnimation.to(waitingPlayers, 1, { alpha: 1 });
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

handleResponse = () => {
  startAnimation.to(question, 1, { alpha: 0 });
  startAnimation.to(question, 0.1, {css: { display: "none" }});

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