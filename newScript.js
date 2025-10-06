const Player = function(name, marker){
    this.name = name;
    this.marker = marker;
    let score = 0;

    return{
        name,
        marker, 
        score,
    }
};

let player1 = Player('Frank', 'X');

let player2 = Player('Bill', 'O');

const DOMmanager = (function(){
    let screenBoard = document.querySelectorAll('td');
    let Board = Array.from(screenBoard).map(item => item.innerHTML);
    const body = document.querySelector('html');

    const player1Display = document.querySelector('#player1');
    const player2Display = document.querySelector('#player2');

    const turnReader = document.querySelector('#turn');

    let BoardObj = {
        line1 : [Board[0], Board[1], Board[2]],
        line2 : [Board[3], Board[4], Board[5]],
        line3 : [Board[6], Board[7], Board[8]],
        column1 : [Board[0], Board[3], Board[6]],
        column2 : [Board[1], Board[4], Board[7]],
        column3 : [Board[2], Board[5], Board[8]],
        diagonal1 : [Board[0], Board[4], Board[8]],
        diagonal2 : [Board[6], Board[4], Board[2]],
    };

    function click(){
        game.startGame()
        body.removeEventListener('click', click, {capture: true})
    }

    const win = function(){
        body.addEventListener('click', click, {capture: true})
    }

    const turnUpdate = function(player){
        turnReader.innerHTML = "Turn: " + player.name + ` (${player.marker})`;
    }

    const updatePlayerDisplay = function(){
        player1Display.children[0].textContent = "Player 1: " + player1.name;
        player1Display.children[1].textContent = "Score: " + player1.score;

        player2Display.children[0].textContent = "Player 2: " + player2.name;
        player2Display.children[1].textContent = "Score: " + player2.score;
    };
    
    return{
        screenBoard,
        Board,
        BoardObj,
        turnUpdate,
        win,
        updatePlayerDisplay,
    }
});


const game = (function(){
    let gameBoard = DOMmanager().BoardObj;

    let turn1 = true;
    let playerTurn = (turn1) ? player1: player2;
    let gameWon = false;

    DOMmanager().screenBoard.forEach(i => i.addEventListener('click', function(){
        if(i.textContent == '')
        {
            i.innerHTML = playerTurn.marker;
            checkWin();
            turn1 = !turn1;
            playerTurn = (turn1) ? player1 : player2;
            DOMmanager().turnUpdate(playerTurn);
        }
    }))

    const startGame = function(){
        DOMmanager().updatePlayerDisplay();
        turn1 = true;
        gameWon = false;
        playerTurn = (turn1) ? player1: player2;
        DOMmanager().turnUpdate(playerTurn);
        Array.from(DOMmanager().screenBoard).map(item => item.textContent = '');
        DOMmanager();
        gameBoard = DOMmanager().BoardObj;
        console.log(`${player1.name} score: ${player1.score}, ${player2.name} score: ${player2.score}`);
    }

    const win = function()
    {
        gameWon = true;
        playerTurn.score += 1;
        DOMmanager().win();
    };

    const checkWin = function(){
        DOMmanager();
        gameBoard = DOMmanager().BoardObj;
        Object.keys(gameBoard).forEach(key =>{
            if(gameBoard[key][0] == gameBoard[key][1] && gameBoard[key][1] == gameBoard[key][2] && gameBoard[key][0] != '')
            {
                win();
            }
        })
    };

    startGame();

    DOMmanager().updatePlayerDisplay();

    console.log(`Welcome ${player1.name} and ${player2.name}`);

    return{
        startGame,
        checkWin,
        playerTurn,
        gameWon,
    }

})();