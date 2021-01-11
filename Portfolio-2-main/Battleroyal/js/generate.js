function startGame() {

    // Set Players to the div
    players = createPlayer();

    console.log(players);

    // Set Players onto Div and display information
    for (let i = turn.start; i < turn.end; i++) {
        let image = document.createElement('img')
        image.src = 'images/' + players[i].image + '.jpg';

        document.getElementById('container').innerHTML += `<p id="${players[i].tribute}">${players[i].name}<br><span id=health${i}>Hp: ${players[i].hp}</span><br><span id="personality${i}">Type: ${players[i].type.personality}</span><br><span>Weapon: ${players[i].wep.weapon}</span><br><span id="img${i}"></span></p>`;

        document.getElementById('img' + i).appendChild(image)
    }

    changeHTML();

    turn.initialGen = false;
}

function changeHTML() {

    // Change HTML
    document.getElementById('selection').innerHTML = `Map: ${generateMap()}`;
    document.getElementById('log').innerHTML += `<li>Game Starts with ${players.length} players!</li>`
    document.getElementById('log2').innerHTML += `<li>Game Starts with ${players.length} players!</li>`
    document.getElementById('selection').innerHTML += "<br></br>";
    document.getElementById('selection').innerHTML += "<button id='simulate1'>Simulate 1 Turn</button>"
    document.getElementById('selection').innerHTML += "<br></br>";
    document.getElementById('selection').innerHTML += "<button id='simulate5'>Simulate 5 Turns</button>"
    document.getElementById('simulate1').addEventListener("click", combat);
    document.getElementById('simulate5').addEventListener("click", fiveCombat);
}

// Crate the exact player and their stats
function createPlayer() {
    let player = [];
    let array = 0;
    let random = 0;

    array = randomFace()

    console.log(array);

    for (let i = turn.start; i < turn.end; i++) {
        random = array[randomInt(0, array.length)];
        if (random == -1) {
            do {
                random = array[randomInt(0, array.length)];
            }
            while (random == -1);
        }
        array.splice(random, 1, -1);

        player.push({ tribute: i, name: randomName(), hp: randomHealth(), wep: randomWeapon(), type: randomType(), image: random, kills: 0 });

        player[i].name = names[player[i].name];

    }
    console.log(array);

    return player;
}