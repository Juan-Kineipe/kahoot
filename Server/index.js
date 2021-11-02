const ws = require('ws')
const R = require('ramda')
const questions = require('./questions')

const server = new ws.Server({
  port: 3000
})

MIN_PLAYERS_TO_START_GAME = 3
TIME_TO_ANSWER_QUESTION = 30000
let currentQuestionNumber = 1
let players = []

const getAllPlayersLobbyData = (players) => {
  const playersWithName = R.reject(R.propSatisfies(name => R.isNil(name), 'name'), players)
  return R.project(['name', 'status'], playersWithName)
}

const getAllPlayersScoreData = (players) => {
  const playersWithName = R.reject(R.propSatisfies(name => R.isNil(name), 'name'), players)
  return R.project(['name', 'score'], playersWithName)
}

const sendNextQuestion = async () => {
  currentQuestionNumber++

  const statusLens = R.lensProp('status')
  const scoreLens = R.lensProp('score')

  if (R.isNil(questions[currentQuestionNumber])) {
    broadcastUpdate('GAME_RESULT', getAllPlayersScoreData(players))
    players = R.map(R.set(statusLens, 'connected'), players)
    players = R.map(R.set(scoreLens, 0), players)
    gameState.state = 'lobby'
    return
  }

  const question = R.omit(['correctResponse'], questions[currentQuestionNumber])
  players = R.map(R.set(statusLens, 'responding'), players)
  broadcastUpdate('QUESTION_UPDATE', question)

  await setTimeout(sendNextQuestion, TIME_TO_ANSWER_QUESTION);
}

const canProceedToQuestionsState = (players) => {
  if (players.length < MIN_PLAYERS_TO_START_GAME) return false
  const ready = R.filter(R.propEq('status', 'ready'), players)
  return ready.length === players.length
}

const gameState = {
  state: 'lobby',
}

server.on('connection', (socket) => {
  const id = uuidv4()
  const status = 'connected'
  const score = 0
  const playerMetadata = { id, status, socket, score }

  players = R.append(playerMetadata, players)

  socket.on('message', (messageAsString) => {
    const message = JSON.parse(messageAsString)
    const player = R.find(R.propEq('socket', socket))(players)

    if (
      gameState.state === 'lobby'
      && !R.isNil(message.name)
    ) {
      player.name = message.name
      console.log(`player ${player.name} conectado`)
      broadcastUpdate('LOBBY_UPDATE', getAllPlayersLobbyData(players))
    }

    if (
      gameState.state === 'lobby'
      && !R.isNil(message.status)
      && !R.isNil(player.name)
    ) {
      player.status = message.status
      console.log(`player ${player.name} está pronto`)
      broadcastUpdate('LOBBY_UPDATE', getAllPlayersLobbyData(players))
      if (canProceedToQuestionsState(players)) {
        console.log('jogo começou')
        gameState.state = 'questions'
        currentQuestionNumber = 0
        sendNextQuestion()
      }
    }

    if (
      gameState.state === 'questions'
      && player.status === 'responding'
      && !R.isNil(message.questionResponse)
    ) {
      const correctResponse = questions[currentQuestionNumber].correctResponse
      if (correctResponse === message.questionResponse) {
          player.score = ++player.score
        }
      player.status = 'responded'
    }
  })

  socket.on('close',() => {
    players = R.reject(R.propEq('socket', socket), players)
  })
})

function broadcastUpdate(type, message) {
  server.clients.forEach((client) => {
    client.send(JSON.stringify({ type, message }));
  });
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
