class Player {
    constructor(name) {
        this.name = name;
    }
}
const app = {
    players: [],
    nameInput: document.querySelector('#name'),
    n
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const newPlayer = new Player(app.nameInput.value);
    console.log(newPlayer);
    app.players.push(newPlayer);
    app.nameInput.setAttribute('placeholder', 'Player 2?');
    app.nameInput.value = '';
    
})