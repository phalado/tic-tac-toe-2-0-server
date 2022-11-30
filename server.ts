const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, { cors: {
  origin: 'https://tic-tac-toe-2-0.herokuapp.com',
  credentials: true
} })

interface PlayerInterface {
  name: string
  id: string
}

interface GameInterface {
  [gameId: string]: {
    playerOne: PlayerInterface,
    playerTwo: PlayerInterface,
    currentPlayer: boolean,
    round: number
  }
}

interface MoveInterface {
  gameId: string
  round: number
  player: boolean
  pieceIndex: number
  pieceValue: number
  cell: number
}

let games: GameInterface = {}

io.on('connection', (socket: any) => {
  socket.on('testConnection', () => io.emit('connectionTested', "Server on"))

  socket.on('createGame', ({ playerOne }: { playerOne: PlayerInterface }) => {
    console.log("Game created by " + playerOne.name)
    let gameId: string = ''
    for (let i = 0; i < 5; i++) gameId += (Math.floor(Math.random() * 10)).toString()
    games[gameId] = {
      playerOne,
      playerTwo: { name: '', id: '' },
      currentPlayer: Math.random() < 0.5,
      round: 0
    }

    io.to(playerOne.id).emit('gameCreated', { gameId })
  })

  socket.on('joinGame', ({ gameId, playerTwo }: { gameId: string, playerTwo: PlayerInterface }) => {
    const game = games[gameId]
    game.playerTwo = playerTwo
    game.round = 1

    const data = {
      gameId,
      playerOne: game.playerOne,
      playerTwo: game.playerTwo,
      playerTurn: game.currentPlayer,
      round: game.round
    }

    io.to(game.playerOne.id).emit('gameStart', { ...data })
    io.to(game.playerTwo.id).emit('gameStart', { ...data })
  })

  socket.on('move', (data: MoveInterface) => {
    const game = games[data.gameId]
    game.round = data.round
    game.currentPlayer = !game.currentPlayer
    const id = game.currentPlayer ? game.playerOne.id : game.playerTwo.id

    io.to(id).emit('newMove', {
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

const port = process.env.PORT || 1337
httpServer.listen(port, () => console.log('Listening on port ' + port + '...'))
