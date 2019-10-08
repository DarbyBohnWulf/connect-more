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
        for (let c = 1; c <= 7; c++) {
            const row = [];
            for (let r = 1; r <= 6; r++) {
                const div = document.createElement('div');
                div.setAttribute('style', `height: ${this.board.offsetWidth / 8}px;\
                width: ${this.board.offsetWidth / 8}px; grid-column: ${c}; grid-row: ${r};\
                background-color: #b3a024;`);
                div.setAttribute('class','connect-slot');
                div.setAttribute('id',`slot-${c}-${r}`);
                this.board.appendChild(div);
                row.push(div);
            }
            this.boardMatrix.push(row);
        }
    }
    makeMove(div) {
        if (div.style.backgroundColor !== 'rgb(179, 160, 36)') {
            console.log('Hey, quit it!');
        } else {
            if (app.game.turn % 2 !== 0) {
                div.style.backgroundColor = '#f00f';
            } else {
                div.style.backgroundColor = '#0f0f';
            }
            console.log(div);
            app.game.fall(div.id);
            app.game.turn++
        }
    
    }
    fall(slottedDiskId) {
        // get numbers for row and column that will be equivalent in this.boardMatrix
        const row = parseInt(slottedDiskId[7]) - 1;
        const col = parseInt(slottedDiskId[5]) - 1;
        console.log(row,col);
        // look at the color of the slot below the clicked slot
        if (row < 5 && this.boardMatrix[col][row + 1].style.backgroundColor === 'rgb(179, 160, 36)') {
            this.boardMatrix[col][row].style.backgroundColor = 'rgb(179, 160, 36)';
            this.makeMove(this.boardMatrix[col][row + 1])//.style.backgroundColor = this.turn % 2 !== 0 ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)';
            this.turn--
        }
    }
}
