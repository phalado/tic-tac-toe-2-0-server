var createServer = require('http').createServer;
var Server = require('socket.io').Server;
var httpServer = createServer();
var io = new Server(httpServer, { cors: { origin: '*' } });
var games = {};
io.on('connection', function (socket) {
    socket.on('createGame', function (playerOne) {
        var gameId = '';
        for (var i = 0; i < 5; i++)
            gameId += (Math.floor(Math.random() * 10)).toString();
        games[gameId] = {
            playerOne: playerOne,
            playerTwo: '',
            currentPlayer: Math.random() < 0.5,
            round: 0
        };
        console.log('1', gameId, games[gameId]);
        io.emit('gameCreated', { gameId: gameId, playerId: gameId + 'A' });
    });
    socket.on('joinGame', function (_a) {
        var gameId = _a.gameId, playerTwo = _a.playerTwo;
        console.log('2', games, gameId, playerTwo);
        var game = games[gameId];
        console.log(game);
        game.playerTwo = playerTwo;
        game.round = 1;
        io.emit('gameStart', {
            gameId: gameId,
            playerOne: game.playerOne,
            playerTwo: game.playerTwo,
            playerTurn: game.currentPlaer,
            round: game.round
        });
    });
    socket.on('move', function (data) {
        io.emit('newMove', data);
        console.log(data);
    });
});
var port = 1337;
httpServer.listen(port);
console.log('Listening on port ' + port + '...');
