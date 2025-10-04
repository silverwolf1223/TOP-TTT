const Player = function(name, marker){
    this.name = name;
    this.marker = marker;
    let score = 0;

    const move = function(position) {
        gameBoard().Board[position] = marker;
        console.log(gameBoard().Board)
    };

    return{
        name,
        marker,
        move,

    }
};

const gameBoard = function(){
    let Board = game.Board;
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
        Object.keys(BoardObj).forEach(obj =>{
            if(BoardObj[obj][0] == BoardObj[obj][1] && BoardObj[obj][1] == BoardObj[obj][2] && BoardObj[obj][0] != undefined)
            {
                return console.log('You win!');
            }
        })
    }

    return{
        Board,
        BoardObj,
        checkWin,
    };
};

const game = (function(){
    let Players = [];
    let Board = new Array(9);

    const startGame = () => Players.forEach((P) => {
        Board = new Array(9);
        P.score = 0;
        console.log(`${P} score : 0`);
    });

    return {Players, startGame, Board};
})();

const player1 = Player('Bob', 'X');

const player2 = Player('Phil', 'O');