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
        this.board.addEventListener('click', this.makeMove);
        console.log(this.board)
        // this.populateBoard();
        return this.board
    }
    populateBoard() {
        for (let c = 1; c <= 7; c++) {
            for (let r = 1; r <= 6; r++) {
                const div = document.createElement('div');
                div.setAttribute('style', `height: ${this.board.offsetWidth / 8}px;\
                width: ${this.board.offsetWidth / 8}px; grid-column: ${c}; grid-row: ${r};\
                background-color: #b3a024;`);
                div.setAttribute('class','connect-slot');

                div.setAttribute('id',`slot-${c}-${r}`);
                this.board.appendChild(div);
            }
        }
    }
    makeMove(event) {
        if (event.target.tagName === 'DIV') {
            if (app.game.turn % 2 !== 0) {
                event.target.style.backgroundColor = '#f00f';
            } else {
                event.target.style.backgroundColor = '#0f0f';
            }
            console.log(event.target);
            // this.fall(event.target);
            app.game.turn++
        }
    
    }
    // fall(slottedDisk) {
    //     if (slottedDisk.) 
    // }
}
