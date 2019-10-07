class Player {
    constructor(name) {
        this.name = name;
    }
}
const app = {
    players: [],
    nameInput: document.querySelector('#name'),
    nameForm: document.querySelector('form'),
    playArea: document.querySelector('#play-area'),
    nameSpace: document.querySelector('#player-names'),
    mainArea: document.querySelector('main'),
    setPlayerName() {
        const newPlayer = new Player(app.nameInput.value);
        console.log(newPlayer);
        this.players.push(newPlayer);
        if (this.players.length >= 2) {
            this.transitionToPlaying();
        } else {
            this.nameInput.value = '';
            this.nameInput.setAttribute('placeholder', 'Player 2?');
        }
        this.showPlayerName(newPlayer);
    },
    showPlayerName(player) {
        const nameHeader = document.createElement('h4');
        nameHeader.className = 'player-name';
        nameHeader.textContent = player.name;
        this.nameSpace.append(nameHeader);
    },
    transitionToPlaying() {
        this.nameForm.remove();
        this.mainArea.classList.add('playing');
    }
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    app.setPlayerName();
})