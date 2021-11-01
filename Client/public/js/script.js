const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("startButton");
var startAnimation = new TimelineMax({ repeat: 0 });

let ws = new WebSocket("ws://localhost:3000")

ws.onmessage = message => {
  const response = JSON.parse(message.data)

  if (response.type === 'LOBBY_UPDATE'){
    console.log('Atualizar lista de jogadores')
    var completeList = document.getElementById("list")
    var playersList = response.message

    completeList.innerHTML = ''
    playersList.forEach(player => {
      const playerStatus =  player.status === "ready"? " está pronto" : " não está pronto"
      completeList.innerHTML += "<li>" + player.name + playerStatus +  "</li>"
    });

    console.log(response)
  }

  if (response.type === 'QUESTION_UPDATE'){
    console.log('mostra pergunta')
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
};