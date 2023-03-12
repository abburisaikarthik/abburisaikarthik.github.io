// const TicTacToeAi = require("../../../../../TicTacToeAi");

const XSVG = `<svg class="X" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M 0 0 l 24 24"/><path d="M 24 0 l -24 24"/></svg>`;

const OSVG = `<svg class="O" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M 12 0 a 12 12 0 1 0 0 24 a 12 12 0 1 0 0 -24" /></svg>`;

let XDIV = document.querySelector(".x-score");
let ODIV = document.querySelector(".o-score");
let select = document.querySelector(".playerselect");
let resetBtn = document.querySelector(".resetBtn");
let winner = document.querySelector(".winner");
let cells = document.querySelectorAll(".cell");

let game_started = false;
let playerSymbol = "X";
let x_score = 0;
let o_score = 0;
let compBoard , aiSymbol , aiPlayer;

XDIV.querySelector(".icon").innerHTML = XSVG;
ODIV.querySelector(".icon").innerHTML = OSVG;

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
initAI(true)

function startGame() {
  game_started = true;
  cells.forEach((c) => {
    c.style.pointerEvents = "all";
  });
  select.style.pointerEvents = "none";
  XDIV.style.pointerEvents = "none";
  ODIV.style.pointerEvents = "none";
}
function endGame() {
  game_started = false;
  cells.forEach((c) => {
    c.style.pointerEvents = "none";
  });
  select.style.pointerEvents = "all";
  XDIV.style.pointerEvents = "all";
  ODIV.style.pointerEvents = "all";
}

function declareWinner(win) {
  if (win != "DRAW") {
    win == "X" ? x_score++ : o_score++;
    win == "X"
      ? (XDIV.querySelector(".score").innerHTML = x_score)
      : (ODIV.querySelector(".score").innerHTML = o_score);
    let svg = win == "X" ? XSVG : OSVG;
    let str = `<div class ="icon">${svg}</div> is the Winner!`;

    winner.innerHTML = str;
  } else if (win == "DRAW") {
    winner.innerHTML = "Draw!";
  }

  winner.style.display = "flex";
}
let moveStack = [];

// function to add move to the stack
function addMoveToStack(cell, playerSymbol) {
  let row = cell.parentElement.classList[1].replace("row", "") * 1 - 1;
  let col = cell.classList[1].replace("cell", "") * 1 - 1;
  moveStack.push({ row, col, playerSymbol });
}

// function to undo the last move
function undoLastMove() {
  if (moveStack.length > 0) {
    // remove the last move from the stack
    let lastMove = moveStack.pop();

    // revert the board to the state before the move was made
    let cell = document.querySelector(`.row${lastMove.row + 1} .cell${lastMove.col + 1}`);
    cell.querySelector(`.${lastMove.playerSymbol}`).style.display = "none";
    cell.style.pointerEvents = "all";
  
    if(select.value!="human")
    {
      board[lastMove.row][lastMove.col] = "";
      undoundo(); 
    }
    else
    {
      board[lastMove.row][lastMove.col] = "";
      playerSymbol = lastMove.playerSymbol == "X" ? "X" : "O";
    }
    
    checkWinner();
  }
}

function undoundo() {
  if (moveStack.length > 0) {
    // remove the last move from the stack
    let lastMove = moveStack.pop();

    // revert the board to the state before the move was made
    let cell = document.querySelector(`.row${lastMove.row + 1} .cell${lastMove.col + 1}`);
    cell.querySelector(`.${lastMove.playerSymbol}`).style.display = "none";
    cell.style.pointerEvents = "all";
  
      board[lastMove.row][lastMove.col] = "";
    checkWinner();
  }
}

// add event listener to undo button
let undoBtn = document.querySelector(".undoBtn");

  undoBtn.addEventListener("click", undoLastMove);


function checkWinner() {
  let diag1 = [board[0][0], board[1][1], board[2][2]];
  let diag2 = [board[0][2], board[1][1], board[2][0]];
  let col1 = [board[0][0], board[1][0], board[2][0]];
  let col2 = [board[0][1], board[1][1], board[2][1]];
  let col3 = [board[0][2], board[1][2], board[2][2]];

  let a = board.concat([diag1, diag2]);
  a.push(col1);
  a.push(col2);
  a.push(col3);
  for (var i = 0; i < a.length; i++) {
    let win = a[i].every((k) => k != "" && k == a[i][0]);
    if (win) {
      let winner = a[i][0];
      endGame();
      declareWinner(winner);
      return true;
    }
  }
  if (board.flat().every((k) => k != "")) {
    declareWinner("DRAW");
    endGame();
  }
  return false;
}
function updateBoard(val, row, col) {
  board[row][col] = val;
}


function makeMove(cell, playerSymbol) {
  cell.style.pointerEvents = "none";
  let svg = cell.querySelector(`.${playerSymbol}`);
  svg.style.display = "block";
  setTimeout(() => {
    svg.style.strokeDashoffset = "0";
  }, 1);
  let row = cell.parentElement.classList[1].replace("row", "") * 1 - 1;

  let col = cell.classList[1].replace("cell", "") * 1 - 1;
  updateBoard(playerSymbol, row, col);
  addMoveToStack(cell, playerSymbol);
  checkWinner();
}
function initAI(flag)
{
  if(flag)
  {
    compBoard = new TicTacToe.TicTacToeBoard(board.flat());
    aiSymbol = compBoard.oppositePlayer(playerSymbol);
    aiPlayer = new TicTacToe.TicTacToeAIPlayer();
    aiPlayer.initialize(aiSymbol,compBoard);
  }
  else{
    compBoard.updateBoard(board.flat());
    aiPlayer.updateBoard(board.flat());
  }
}

XDIV.addEventListener("click", (e) => {
  playerSymbol = "X";
  XDIV.classList.add("playerActive");
  ODIV.classList.remove("playerActive");
  initAI(true);
});
ODIV.addEventListener("click", (e) => {
  playerSymbol = "O";
  XDIV.classList.add("playerActive");
  ODIV.classList.remove("playerActive");
  initAI(true);
});

cells.forEach((cell) => {
  cell.innerHTML = XSVG + OSVG;
  cell.addEventListener("click", function click(e) {
    if (!select.value) {
      alert("choose a player");
      return;
    }
    !game_started && startGame();
    if (select.value == "human") {
      makeMove(e.target, playerSymbol);
      playerSymbol = playerSymbol == "X" ? "O" : "X";
    }
    else{
      makeMove(e.target,playerSymbol);
      initAI(false);
      let move = aiPlayer.makeMove();
      if(move !=null)
      {
        let[index,s] = compBoard.makeMove(aiSymbol,move);
        setTimeout(()=>{
          makeMove(cells[index],s);
        },400)
      }
    }
  });
});
resetBtn.addEventListener("click", (e) => {
  game_started = false;
  winner.style.display = "none";
  playerSymbol = document.querySelector(".playerActive svg").classList[0];
  board = board.map((b) => b.map(() => ""));
  cells.forEach((c) => {
    c.style.pointerEvents = "all";
    c.querySelectorAll("svg").forEach((s) => {
      s.style.display = "none";

      s.style.strokeDashoffset = s.classList.contains("X") ? "36" : "76";
    });
  });
  XDIV.style.pointerEvents = "all";
  ODIV.style.pointerEvents = "all";
  select.style.pointerEvents = "all";
});
