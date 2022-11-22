const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, { cors: { origin: '*' } })

interface Game {
  (gameId: string): {
    playerOne: string
    playerTwo: string
    currentPlaer: boolean
    round: number
  }
}

let games = {}

io.on('connection', (socket) => {

  socket.on('createGame', ({ playerOne }) => {
    let gameId: string = ''
    for (let i = 0; i < 5; i++) gameId += (Math.floor(Math.random() * 10)).toString()
    games[gameId] = {
      playerOne,
      playerTwo: '',
      currentPlayer: Math.random() < 0.5,
      round: 0
    }
    console.log('1', gameId, games[gameId])

    io.emit('gameCreated', { gameId, playerId: gameId + 'A' })
  })

  socket.on('joinGame', ({ gameId, playerTwo }) => {
    const game = games[gameId]
    game.playerTwo = playerTwo
    game.round = 1

    io.emit('gameStart', {
      gameId,
      playerOne: game.playerOne,
      playerTwo: game.playerTwo,
      playerTurn: game.currentPlaer,
      round: game.round
    })
  })

  socket.on('move', data => {
    io.emit('newMove', data)
    console.log(data)
  })
})


const port = 1337
httpServer.listen(port)
console.log('Listening on port ' + port + '...')
