
# Tic-Tac-Toe 2.0 Server


This web app is a different version of Tic-Tac-Toe.


<h1 align="center"><img src="https://rawcdn.githack.com/phalado/tic-tac-toe-2-0/main/public/assets/images/screenshot.png"></h1>

## Table of contents

- [Tic-Tac-Toe 2.0 Server](#tic-tac-toe-20-server)
  - [Table of contents](#table-of-contents)
  - [About](#about)
  - [The project](#the-project)
    - [The game](#the-game)
    - [The server](#the-server)
    - [Technologies used](#technologies-used)
  - [Contact](#contact)

## About

Link to the live version [here][live-version].

Repository: https://github.com/phalado/tic-tac-toe-2-0-server

Game repository: https://github.com/phalado/tic-tac-toe-2-0/

Please, star the projects. It makes me happy.

## The project

### The game

This is an online multiplayer game, so you need a friend to play with (yes, I know that I'm asking too much for you to have a friend).

Before playing, you need to create a game, receiving a game ID from the server.

After that, share your game ID with your guinea pig friend.

You can use the input next to "Change username" to change your username.

![ttt01][ttt01]

After receiving the game ID, type it in the input next to the "Join Game" button and click on it.

The game must start immediately.

An error will occur if you try to enter an invalid game ID or if you try to join a game with two players.


![ttt02][ttt02]

To make a move click on the coin you want to move then the cell that will be its destiny.

![ttt03][ttt03]

The process is the same to overlap a coin. Select a coin bigger than the one you want to overlap and then click on the desired cell.

![ttt04][ttt04]

![ttt05][ttt05]

Basically, the game over rules is the same as the normal Tic-Tac-Toe.

The only difference is that you will have a draw if both players end up without any coins.

![ttt06][ttt06]

After the game is over, you can try a rematch with your friend by clicking on "Play Again".


### The server

The server was done using socket.io and express to create a websocket. It creates an object to store the games' data and be able to share it between the clients.

### Technologies used

To create this project I used:

- Socket.io
- Express
- TypeScript
- A bit of HTML and CSS
- React
- Context
- Github
- Netlify for Front-End
- Heroku for server

## Contact

Author: Raphael Cordeiro

Follow me on [Twitter][rapha-twitter], visit my [Github portfolio][rapha-github], my [Linkedin][rapha-linkedin], or my [personal portfolio][rapha-personal].


<!-- Links -->

[live-version]: https://tic-tac-toe-2-0.netlify.app/
[server]: https://github.com/phalado/tic-tac-toe-2-0-server
[game]: https://github.com/phalado/tic-tac-toe-2-0/
[rapha-github]: https://github.com/phalado
[rapha-twitter]: https://twitter.com/phalado
[rapha-linkedin]: https://www.linkedin.com/in/raphael-cordeiro/
[rapha-personal]: https://www.phalado.tech/

<!-- Images -->

[screen]: https://rawcdn.githack.com/phalado/tic-tac-toe-2-0/main/public/assets/images/screenshot.png
[ttt01]: https://rawcdn.githack.com/phalado/tic-tac-toe-2-0/main/public/assets/images/ttt01.gif
[ttt02]: https://rawcdn.githack.com/phalado/tic-tac-toe-2-0/main/public/assets/images/ttt02.gif
[ttt03]: https://rawcdn.githack.com/phalado/tic-tac-toe-2-0/main/public/assets/images/ttt03.gif
[ttt04]: https://rawcdn.githack.com/phalado/tic-tac-toe-2-0/main/public/assets/images/ttt04.gif
[ttt05]: https://rawcdn.githack.com/phalado/tic-tac-toe-2-0/main/public/assets/images/ttt05.gif
