const startButton = document.getElementById("startButton");
var    startAnimation = new TimelineMax({repeat:0});

startButton.onclick = function(){
    console.log('Conecta com server e começa o jogo')
    startAnimation.to([startButton, title, nameInput], 1, {alpha:0});
}

