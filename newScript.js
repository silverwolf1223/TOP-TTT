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

let player1 = Player('Joe', 'X');

let player2 = Player('Bob', 'O');

const DOMmanager = (function(){
    let screenBoard = document.querySelectorAll('td');
    let Board = Array.from(screenBoard).map(item => item.innerHTML);
    const body = document.querySelector('html');

    const player1Display = document.querySelector('#player1');
    const player2Display = document.querySelector('#player2');

    const turnReader = document.querySelector('#turn');
    const marker = document.querySelector('#marker');

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

    const win = function(player){
        body.addEventListener('click', click, {capture: true})
        screenBoard.forEach(i => i.style.pointerEvents = "none")
        turnReader.innerHTML = player.name + " WINS!";
    }

    const turnUpdate = function(player){
        turnReader.innerHTML = "Turn: " + player.name;
        marker.innerHTML = player.marker;
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


    function tileManager(){
        if(this.textContent == '' && !gameWon)
        {
            this.innerHTML = playerTurn.marker;
            checkWin();
            if(gameWon) return;
            turn1 = !turn1;
            playerTurn = (turn1) ? player1 : player2;
            DOMmanager().turnUpdate(playerTurn);
        }
    }

    const startGame = function(){
        turn1 = true;
        gameWon = false;
        playerTurn = (turn1) ? player1: player2;
        gameBoard = DOMmanager().BoardObj;

        DOMmanager().updatePlayerDisplay();
        DOMmanager().turnUpdate(playerTurn);
        Array.from(DOMmanager().screenBoard).map(item => item.textContent = '');
        DOMmanager().screenBoard.forEach(i => i.style.pointerEvents = "auto");
    }

    const win = function()
    {
        gameWon = true;
        playerTurn.score += 1;
        DOMmanager().win(playerTurn);
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

    const reset = function(){
        player1.score = 0;
        player2.score = 0;
        startGame();
    };

    startGame();

    DOMmanager().updatePlayerDisplay();

    DOMmanager().screenBoard.forEach(i => i.addEventListener('click', tileManager));

    return{
        startGame,
        reset,
        checkWin,
        playerTurn,
        gameWon,
        tileManager,
    }

})();