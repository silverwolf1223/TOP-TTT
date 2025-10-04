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

    const checkWin = function(){
        UpdateBoard();
        Object.keys(BoardObj).forEach(obj =>{
            if(BoardObj[obj][0] == BoardObj[obj][1] && BoardObj[obj][1] == BoardObj[obj][2] && BoardObj[obj][0] != '')
            {
                return console.log('You win!');
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

const game = (function(){
    let Board = new Array(9);

    const startGame = (function(){
        Board = new Array(9);
        console.log(`Welcome ${player1.name} and ${player2.name}`)
        console.log(`${player1.name} score: ${player1.score}, ${player2.name} score: ${player2.score}`)
    });

    startGame();

    return {startGame, Board};
})();

const DOMmanager = (function(doc){
    let screenBoard = doc.querySelectorAll('td');
    let BoardArray = Array.from(screenBoard);
    let playerTrun = (!player1) ? player1: player2;

    screenBoard.forEach(i => i.addEventListener('click', function(){i.innerHTML = playerTrun.marker;
        gameBoard().checkWin();
        screenBoard = doc.querySelectorAll('td');
        BoardArray = Array.from(screenBoard);
    }))

    return {
        screenBoard,
        BoardArray,
    }
})(document || documentMock);