const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("startButton");
var startAnimation = new TimelineMax({ repeat: 0 });

let ws = new WebSocket("ws://localhost:3000")

startButton.onclick = function () {

  console.log(nameInput.value)
  if (nameInput.value !== '') {
    console.log("Conecta com server e começa o jogo");
    const payLoad = {
      name: nameInput.value,
      status: "ready"
    }

    ws.send(JSON.stringify(payLoad))

    startAnimation.to(card, 1, { alpha: 0 });
    startAnimation.to(card, 0.1, {css: { display: "none" }});

    startAnimation.to(waiting, 0.1, {css: { display: "grid" }});
    startAnimation.to(waiting, 1, { alpha: 1 });


    ws.onmessage = message => {
    const response = JSON.parse(message.data)

    if (response.type === 'LOBBY_UPDATE'){
      console.log('Atualizar lista de jogadores')
      
    }

    if (response.type === 'QUESTION_UPDATE'){
      console.log('mostra pergunta')
    }

    }
  } else {
    alert("Digite um nome!")
  }
};
