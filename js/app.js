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
const app = {
    players: [],
    nameInput: document.querySelector('#name'),
    nameForm: document.querySelector('form'),
    playArea: document.querySelector('#play-area'),
    nameSpace: document.querySelector('#player-names'),
    mainArea: document.querySelector('main'),
    infoArea: document.querySelector('#info'),
    p1Name: document.querySelector('#p1-name'),
    p1Wins: document.querySelector('#p1-wins'),
    p1Losses: document.querySelector('#p1-losses'),
    p2Name: document.querySelector('#p2-name'),
    p2Wins: document.querySelector('#p2-wins'),
    p2Losses: document.querySelector('#p2-losses'),
    board: undefined,
    activities: [
        'game-choice', 'Connection Game', 'Self Destruct(!)'
    ],
    orderVotes: [],
    game: undefined,
    setPlayerName() {
        const newPlayer = new Player(app.nameInput.value);
        console.log(newPlayer);
        this.players.push(newPlayer);
        // if 2 players have been named
        if (this.players.length === 2) {
            this.transitionScreenTo('voting');
        // else, set page up to get P2's name
        } else {
            this.nameInput.value = '';
            this.nameInput.setAttribute('placeholder', 'Player 2?');
        }
        this.updatePlayerInfo(newPlayer,this.players.length);
    },
    // adds player names to the DOM
    updatePlayerInfo(player,number) {
        if (number === 1) {
            console.log('adding player 1 info...');
            this.p1Name.textContent = player.name;
            this.p1Wins.textContent = player.wins;
            this.p1Losses.textContent = player.losses;
        } else {
            console.log('adding player 2 info...');
            this.p2Name.textContent = player.name;
            this.p2Wins.textContent = player.wins;
            this.p2Losses.textContent = player.losses;
        }
    },
    // sets DOM up for an activity
    transitionScreenTo(mainClass) {
        this.clearArea(this.playArea);
        this.mainArea.classList.add(mainClass);
        if (mainClass === 'voting') {
            this.showChoices(['player-vote', this.players[0].name, 'IDC', this.players[1].name]);
        } else {
            this.mainArea.classList.remove('voting');
            this.showChoices(this.activities);
            this.infoArea.classList.add('play-info');
        }
    },
    startConnectGame() {
        this.clearArea(this.playArea);
        this.game = new ConnectionGame(this.players[0],this.players[1]);
        this.board = this.game.createGameBoard(this.playArea.scrollWidth);
        this.playArea.appendChild(this.board);
        this.game.populateBoard();
    },
    showChoices(choices) {
        for (let i = 1; i < choices.length; i++) {
            const option = document.createElement('button');
            option.textContent = choices[i];
            option.classList.add(choices[0]);
            option.setAttribute('id',choices[i].split(' ').join('-').toLowerCase());
            this.playArea.appendChild(option);
            option.addEventListener('click', this.choiceHandler)
        }
    },
    // can be used to empty an element or just trim from the end
    clearArea(htmlArea, count = 0,) {
        if (count) {
            for (let i = 0; i < count; i++) {
                htmlArea.removeChild(htmlArea.lastElementChild);
            }
        } else {
            while (htmlArea.lastElementChild) {
                htmlArea.removeChild(htmlArea.lastElementChild);
            }
        }
    },
    takeVote(playerName) {
        console.log('vote for', playerName);
        this.orderVotes.push(playerName);
        if (this.orderVotes.length < 2) {
        } else {
            this.clearArea(this.playArea);
            this.tallyVotes();
        }
    },
    tallyVotes() {
        if (this.orderVotes[0] === this.orderVotes[1] && this.orderVotes[0] !== 'idc') {
            console.log(this.orderVotes[0],'wins');
            this.setPlayOrder(this.orderVotes[0]);
        } else if (this.orderVotes[0] === 'idc') {
            console.log(this.orderVotes[1],'wins');
            this.setPlayOrder(this.orderVotes[1]);
        } else if (this.orderVotes[1] === 'idc') {
            console.log(this.orderVotes[0],'wins');
            this.setPlayOrder(this.orderVotes[0]);
        } else {
            console.log('You don\'t care? I will choose your order.');
            // 50/50 chance that the order will change,
            if (Math.floor(Math.random() * 2) > 0) {
                this.players = [this.players[1],this.players[0]]
            }
        }
        this.updatePlayerInfo(this.players[0],1);
        this.updatePlayerInfo(this.players[1],2);
        this.transitionScreenTo('playing');
    },
    setPlayOrder(playerName) {
        // only change order if the vote lands on player 2
        console.log('setting order');
        if (this.players[1].name.toLowerCase() === playerName) {
            console.log('second player chosen');
            this.players.unshift(this.players.splice(1)[0]);
        }
    },
    startGame(gameChoice) {
        switch (gameChoice) {
            case 'connection-game':
                this.startConnectGame();
                break
            default:
        }
    },
    choiceHandler(event) {
        event.preventDefault();
        switch (event.target.getAttribute('class')) {
            case 'game-choice':
                app.startGame(event.target.getAttribute('id'));
                break
            case 'player-vote':
                app.takeVote(event.target.getAttribute('id'));
                break;
            default:
        }
    }
}

app.nameForm.addEventListener('submit', e => {
    e.preventDefault();
    app.setPlayerName();
})
