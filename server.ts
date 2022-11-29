const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, { cors: { origin: true } })

let games: any = {}

io.on('connection', (socket: any) => {
  socket.on('testConnection', () => io.emit('connectionTested', "Server on"))

  socket.on('createGame', ({ playerOne }: { playerOne: string }) => {
    console.log("Game created by " + playerOne)
    let gameId: string = ''
    for (let i = 0; i < 5; i++) gameId += (Math.floor(Math.random() * 10)).toString()
    games[gameId] = {
      playerOne,
      playerTwo: '',
      currentPlayer: Math.random() < 0.5,
      round: 0
    }

    io.emit('gameCreated', { gameId, playerId: gameId + 'A' })
  })

  socket.on('joinGame', ({ gameId, playerTwo }: { gameId: string, playerTwo: string }) => {
    const game = games[gameId]
    game.playerTwo = playerTwo
    game.round = 1

    io.emit('gameStart', {
      gameId,
      playerOne: game.playerOne,
      playerTwo: game.playerTwo,
      playerTurn: game.currentPlayer,
      round: game.round
    })
  })

  socket.on('move', (
    data: {
      gameId: string,
      round: number,
      player: boolean,
      pieceIndex: number,
      pieceValue: number,
      cell: number
    }) => {
    const game = games[data.gameId]
    game.round = data.round
    game.currentPlayer = !game.currentPlayer

    io.emit('newMove', {
      gameId: data.gameId,
      playerTurn: game.currentPlayer,
      round: game.round,
      player: data.player,
      pieceIndex: data.pieceIndex,
      pieceValue: data.pieceValue,
      cell: data.cell
    })
  })
})

const port = 1337
httpServer.listen(port)
console.log('Listening on port ' + port + '...')
