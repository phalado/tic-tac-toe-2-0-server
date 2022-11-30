var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var createServer = require('http').createServer;
var Server = require('socket.io').Server;
var httpServer = createServer();
var io = new Server(httpServer, { cors: {
        origin: 'https://tic-tac-toe-2-0.herokuapp.com',
        credentials: true
    } });
var games = {};
io.on('connection', function (socket) {
    socket.on('testConnection', function () { return io.emit('connectionTested', "Server on"); });
    socket.on('createGame', function (_a) {
        var playerOne = _a.playerOne;
        console.log("Game created by " + playerOne.name);
        var gameId = '';
        for (var i = 0; i < 5; i++)
            gameId += (Math.floor(Math.random() * 10)).toString();
        games[gameId] = {
            playerOne: playerOne,
            playerTwo: { name: '', id: '' },
            currentPlayer: Math.random() < 0.5,
            round: 0
        };
        io.to(playerOne.id).emit('gameCreated', { gameId: gameId });
    });
    socket.on('joinGame', function (_a) {
        var gameId = _a.gameId, playerTwo = _a.playerTwo;
        var game = games[gameId];
        game.playerTwo = playerTwo;
        game.round = 1;
        var data = {
            gameId: gameId,
            playerOne: game.playerOne,
            playerTwo: game.playerTwo,
            playerTurn: game.currentPlayer,
            round: game.round
        };
        io.to(game.playerOne.id).emit('gameStart', __assign({}, data));
        io.to(game.playerTwo.id).emit('gameStart', __assign({}, data));
    });
    socket.on('move', function (data) {
        var game = games[data.gameId];
        game.round = data.round;
        game.currentPlayer = !game.currentPlayer;
        var id = game.currentPlayer ? game.playerOne.id : game.playerTwo.id;
        io.to(id).emit('newMove', {
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
var port = process.env.PORT || 1337;
httpServer.listen(port, function () { return console.log('Listening on port ' + port + '...'); });
