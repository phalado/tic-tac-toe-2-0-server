var createServer = require('http').createServer;
var Server = require('socket.io').Server;
var httpServer = createServer();
var io = new Server(httpServer, { cors: { origin: '*', 'Access-Control-Allow-Origin': '*' } });
var games = {};
io.on('connection', function (socket) {
    socket.on('testConnection', function () { return io.emit('connectionTested', "Server on"); });
    socket.on('createGame', function (_a) {
        var playerOne = _a.playerOne;
        console.log("Game created by " + playerOne);
        var gameId = '';
        for (var i = 0; i < 5; i++)
            gameId += (Math.floor(Math.random() * 10)).toString();
        games[gameId] = {
            playerOne: playerOne,
            playerTwo: '',
            currentPlayer: Math.random() < 0.5,
            round: 0
        };
        io.emit('gameCreated', { gameId: gameId, playerId: gameId + 'A' });
    });
    socket.on('joinGame', function (_a) {
        var gameId = _a.gameId, playerTwo = _a.playerTwo;
        var game = games[gameId];
        game.playerTwo = playerTwo;
        game.round = 1;
        io.emit('gameStart', {
            gameId: gameId,
            playerOne: game.playerOne,
            playerTwo: game.playerTwo,
            playerTurn: game.currentPlayer,
            round: game.round
        });
    });
    socket.on('move', function (data) {
        var game = games[data.gameId];
        game.round = data.round;
        game.currentPlayer = !game.currentPlayer;
        io.emit('newMove', {
            gameId: data.gameId,
            playerTurn: game.currentPlayer,
            round: game.round,
            player: data.player,
            pieceIndex: data.pieceIndex,
            pieceValue: data.pieceValue,
            cell: data.cell
        });
    });
});
var port = 1337;
httpServer.listen(port);
console.log('Listening on port ' + port + '...');
