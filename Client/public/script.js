const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("startButton");
var startAnimation = new TimelineMax({ repeat: 0 });

startButton.onclick = function () {

  console.log(nameInput.value)
  if (nameInput.value !== '') {
    console.log("Conecta com server e começa o jogo");
    startAnimation.to([title, card], 1, { alpha: 0 });
    startAnimation.to([title, card], 0.1, {css: { display: "none" }});
  } else {
    alert("Digite um nome!")
  }
};
