/* This file is part of Connect More.

Connect More is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Connect More is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Connect More.  If not, see <https://www.gnu.org/licenses/>. */
class ConnectionGame {
    constructor(p1,p2) {
        this.player1 = p1;
        this.player2 = p2;
        this.board = undefined;
        this.turn = 1;
        this.boardMatrix = [];
        this.lastMove = { x: 0, y: 0 };

    }
    createGameBoard(playAreaWidth) {
        this.board = document.createElement('section');
        this.board.setAttribute('id','connect-game');
        this.board.setAttribute('width',playAreaWidth)
        this.board.setAttribute('height', playAreaWidth);
        this.board.addEventListener('click', e => {
            if (e.target.tagName === 'DIV') {
                this.makeMove(e.target);
            }
        });
        console.log(this.board)
        // this.populateBoard();
        return this.board
    }
    populateBoard() {
        // these are used to keep track of the diagonal lanes
        let diagU = 0;
        let diagD = 6;
        // for every column
        for (let c = 1; c <= 7; c++) {
            // create a new array to hold the slots
            const slots = [];
            // make an identifiable div for every space in the column
            for (let r = 1; r <= 6; r++) {
                const div = document.createElement('div');
                div.setAttribute('style', `height: ${this.board.offsetWidth / 8}px;\
                width: ${this.board.offsetWidth / 8}px; grid-column: ${c}; grid-row: ${r};\
                background-color: #b3a024;`);
                div.setAttribute('class',`connect-slot col${c} row${r} diagU${diagU + r} diagD${diagD + r}` );
                div.setAttribute('id',`slot-${c}-${r}`);
                this.board.appendChild(div);
                slots.push(div);
            }
            this.boardMatrix.push(slots);
            diagU++
            diagD--
        }
    }
    makeMove(div) {
        if (div.style.backgroundColor !== 'rgb(179, 160, 36)') {
            console.log('Hey, quit it!');
        //only makeMove and increment turn if the move is in a free space
        } else {
            if (app.game.turn % 2 !== 0) {
                div.style.backgroundColor = '#f00f';
            } else {
                div.style.backgroundColor = '#0f0f';
            }
            console.log(div);
            app.game.fall(div.id);
            if (this.checkLastMove()) console.log(`${[this.player2,this.player1][this.turn % 2].name} wins!`);;
            app.game.turn++;
        }
    
    }
    fall(slottedDiskId) {
        // get numbers for row and column that will be equivalent in this.boardMatrix
        const row = parseInt(slottedDiskId[7]) - 1;
        const col = parseInt(slottedDiskId[5]) - 1;
        console.log(col,row);
        // look at the color of the slot below the clicked slot
        if (row < 5 && this.boardMatrix[col][row + 1].style.backgroundColor === 'rgb(179, 160, 36)') {
            this.boardMatrix[col][row].style.backgroundColor = 'rgb(179, 160, 36)';
            this.makeMove(this.boardMatrix[col][row + 1]);
            // since we're reusing this.makeMove, we need to account for the extra turns
            this.turn--;
        }
        this.lastMove.x = col;
        this.lastMove.y = row;

    }
    checkLastMove() {
        // don't check if no player has 4 disks on the board
        if (this.turn < 7) return false
        console.log('checking last move');
        if (this.checkRow(this.lastMove.y)) return true
        if (this.checkColumn(this.lastMove.x)) return true
    }
    checkColorMatch(elem1,elem2) {
        console.log('checking color match');
        if (elem1.style.backgroundColor === elem2.style.backgroundColor && elem1.style.backgroundColor !== 'rgb(179, 160, 36)') return true
    }
    checkRow(rowNum) {
        let chainLength = 0
        for (let i = 0; i < 6; i++) {
            if (this.checkColorMatch(this.boardMatrix[i][rowNum],this.boardMatrix[i+1][rowNum])) {
                chainLength++;
                console.log(chainLength,i);
                // as we're checking if the next item matches, we only have to get up to 3 links e.g (.-.-.-.)
                if (chainLength === 3) return true
            } else {
                // on the 4th iteration, if the two slots don't match, there isn't room for a full chain anymore
                if (i > 2) return false
                chainLength = 0;
            }
        }
    }
    checkColumn(colNum) {
        let chainLength = 0
        for (let i = 0; i < 5; i++) {
            if (this.checkColorMatch(this.boardMatrix[colNum][i],this.boardMatrix[colNum][i+1])) {
                chainLength++;
                console.log(chainLength,i);
                // as we're checking if the next item matches, we only have to get up to 3 links
                if (chainLength === 3) return true
            } else {
                if (i > 1)
                chainLength = 0;
            }
        }
    }
    // checkUpRightDiagonal(coords) {
    //     const lane = [];
    //     for (let i = coords)
    // }
}
