const Player = function(name, marker){
    this.name = name;
    this.marker = marker;
    let score = 0;

    const move = function(position) {
        if(gameBoard().Board[position] == undefined)
        {
            gameBoard().Board[position] = marker;
        }
        else
        {
            console.log("Square already taken");
        }
        console.log(gameBoard().Board)
    };

    return{
        name,
        marker,
        move,
        score,
    }
};

let player1 = Player('Player1', 'X');

let player2 = Player('Player2', 'O');

const gameBoard = function(){
    let Board = Array.from(DOMmanager.BoardArray).map(item => item.textContent);
    let BoardObj;

    let gameWon = false;

    const checkWin = function(){
        UpdateBoard();
        Object.keys(BoardObj).forEach(obj =>{
            if(BoardObj[obj][0] == BoardObj[obj][1] && BoardObj[obj][1] == BoardObj[obj][2] && BoardObj[obj][0] != '')
            {
                DOMmanager.playerTurn.score += 1;
                let gameWon = true;
                return console.log(`${DOMmanager.playerTurn.name} wins!`);
            }
        })
    }

    const UpdateBoard = function(){
        Board = Array.from(DOMmanager.BoardArray).map(item => item.textContent);
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

    return{
        Board,
        BoardObj,
        checkWin,
    };
};

const DOMmanager = (function(doc){
    let screenBoard = doc.querySelectorAll('td');
    let BoardArray = Array.from(screenBoard);
    let p1t = true;
    let playerTurn = (p1t) ? player1: player2;

    const turnReader = doc.querySelector('#turn');

    const body = doc.querySelector('h1');

    body.addEventListener('click', function(){
        if(gameBoard.gameWon)
        {
            startGame();
            gameBoard.gameWon = false;
        }
    })

    screenBoard.forEach(i => i.addEventListener('click', function(){
        if(i.textContent == '')
        {
            i.innerHTML = playerTurn.marker;
            gameBoard().checkWin();
            p1t = !p1t;
            playerTurn = (p1t) ? player1: player2;
            screenBoard = doc.querySelectorAll('td');
            BoardArray = Array.from(screenBoard);
            turnUpdate();
        }
    }))

    const turnUpdate = function(){
        turnReader.innerHTML = playerTurn.name
    }


    turnUpdate();

    return {
        screenBoard,
        BoardArray,
        playerTurn,
    }
})(document || documentMock);

const game = (function(){
    let Board = new Array(9);
    console.log(`Welcome ${player1.name} and ${player2.name}`);

    const startGame = (function(){
        Board = new Array(9);
        (DOMmanager.BoardArray).map(item => item.textContent = '');
        console.log(`${player1.name} score: ${player1.score}, ${player2.name} score: ${player2.score}`);
    });

    startGame();

    return {startGame, Board,};
})();