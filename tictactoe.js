const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let squares = ['filler space', 1, 2, 3, 4, 5, 6, 7, 8, 9];
let movesMade = 0;
let currentPlayer = 'X';

function gameBoard() {
  console.log(
    '\n',
    ` ${squares[1]} | ${squares[2]} | ${squares[3]}\n`,
    `-----------\n`,
    ` ${squares[4]} | ${squares[5]} | ${squares[6]}\n`,
    `-----------\n`,
    ` ${squares[7]} | ${squares[8]} | ${squares[9]}\n`
  );
}

function findWinner() {
  // diagonal check
  if (squares[1] === squares[5] && squares[1] === squares[9]) return true;
  if (squares[3] === squares[5] && squares[3] === squares[7]) return true;

  // horizontal check
  for (let i = 1; i <= 9; i += 3) {
    if (squares[i] === squares[i + 1] && squares[i] === squares[i + 2]) {
      return true;
    }
  }
  // vertical check
  for (let i = 1; i <= 3; i++) {
    if (squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
      return true;
    }
  }

  // draw check
  if (movesMade === 9) {
    return 'Draw';
  }

  return false;
}

function makeMove(position, player) {
  movesMade++;
  squares[position] = player;
}

function moveValid(position) {
  return typeof squares[position] === 'number' && position <= 9;
}

function game() {
  console.log(gameBoard());

  rl.question(`Your move Player ${currentPlayer} `, function(position) {
    if (moveValid(position)) {
      makeMove(position, currentPlayer);
      switch (findWinner()) {
        case true:
          console.log(gameBoard(), `Player ${currentPlayer} is the winner!`);
          return rl.close();
        case false:
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          game();
          break;
        case 'Draw':
          console.log(gameBoard(), 'It is a Draw. Play again!');
          return rl.close();
      }
    } else {
      console.log(
        'Sorry that is an invalid move.\nPick a square between 1-9 that has not been occupied by a player.'
      );
      game();
    }
  });
}

game();
