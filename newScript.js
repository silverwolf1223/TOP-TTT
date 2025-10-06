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

let player1 = Player('Player1', 'X');

let player2 = Player('Player2', 'O');

const DOMmanager = (function(doc){
    let screenBoard = doc.querySelectorAll('td');
    let Board = Array.from(screenBoard).map(item => item.innerHTML);
    const body = doc.querySelector('*');

    const turnReader = doc.querySelector('#turn');

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

    const UpdateBoard = function(){
        Board = Array.from(screenBoard).map(item => item.innerHTML);
        BoardObj = {
        line1 : [Board[0], Board[1], Board[2]],
        line2 : [Board[3], Board[4], Board[5]],
        line3 : [Board[6], Board[7], Board[8]],
        column1 : [Board[0], Board[3], Board[6]],
        column2 : [Board[1], Board[4], Board[7]],
        column3 : [Board[2], Board[5], Board[8]],
        diagonal1 : [Board[0], Board[4], Board[8]],
        diagonal2 : [Board[6], Board[4], Board[2]],
        };
    }

    const win = function(){
        body.addEventListener('click', function(){
            game.startGame();
            body.removeEventLister('click', function(){});
        })
    }

    const turnUpdate = function(player){
        turnReader.innerHTML = player.name;
    }
    
    return{
        screenBoard,
        Board,
        BoardObj,
        UpdateBoard,
        turnUpdate,
        win,
    }
})(document || documentMock);


const game = (function(){
    let gameBoard = DOMmanager.BoardObj;

    let turn1 = true;
    let playerTurn = (turn1) ? player1: player2;

    let gameWon = false;

    DOMmanager.screenBoard.forEach(i => i.addEventListener('click', function(){
        if(i.textContent == '' && !gameWon)
        {
            DOMmanager. screenBoard = document.querySelectorAll('td');
            i.innerHTML = playerTurn.marker;
            checkWin();
            turn1 = turn1;
            playerTurn = (turn1) ? player1 : player2;
            console.log(playerTurn)
            DOMmanager.UpdateBoard();
            DOMmanager.turnUpdate(playerTurn);
        }
    }))

    const startGame = function(){
        turn1 = true;
        gameWon = false;
        DOMmanager.turnUpdate(playerTurn);
        (DOMmanager.Board).map(item => item.textContent = '');
        console.log(`${player1.name} score: ${player1.score}, ${player2.name} score: ${player2.score}`);
    }

    const win = function()
    {
        playerTurn.score += 1;
        gameWon = true;
        DOMmanager.win();
    };

    const checkWin = function(){
        DOMmanager.UpdateBoard();
        gameBoard = DOMmanager.BoardObj;
        Object.keys(gameBoard).forEach(key =>{
            if(gameBoard[key][0] == gameBoard[key][1] && gameBoard[key][1] == gameBoard[key][2] && gameBoard[key][0] != '')
            {
                console.log('a')
                win();
            }
        })
    };

    startGame();

    console.log(`Welcome ${player1.name} and ${player2.name}`);

    return{
        startGame,
        checkWin,
        playerTurn,
    }

})();