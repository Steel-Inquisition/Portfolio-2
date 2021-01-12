function combat() {
    passiveEvent();
    attack();
}

function fiveCombat() {
    for (let i = 0; i < 5; i++) {
        combat();
    }
}

function passiveEvent() {



}

function attack() {


    // Get attacker and defender from list from players.length
    let attacker = randomInt(0, players.length);
    let defender = randomInt(0, players.length);
    let shield = 0;
    let eventSignal = false;
    let text;
    let cause_of_death = "";
    let logEl = document.getElementById('log');
    let log2El = document.getElementById('log2');

    if (players.length > 1) {

        // Set up Timer
        turn.round++;
        turn.storage++;

        // Change HTML to reflect change
        text = `<li><strong>Turn: ${turn.storage}</strong></li>`
        logEl.innerHTML += text;
        log2El.innerHTML += text;


        // Set up damage based on attackers weapon and deal that damage to defender
        let damage = players[attacker].wep.ability;

        // Add or subtract damage based on weapon type
        switch (players[defender].wep.type) {
            case "physical": // If defender has a physical weapon + 6 damage
                if (players[attacker].wep.type == "ranged") {
                    damage += 6;
                }
                break;
            case "ranged": // If attacker has a ranged weapon and opponet has ranged, -= 6 damage
                if (players[attacker].wep.type == "ranged") {
                    damage -= 6;
                }
                break;
            case "magic": // If defender has ranged or physical + 3 dam, otherwise -5 dam
                if (players[defender].wep.type == "ranged") {
                    damage += 3;
                } else if (players[defender].wep.type == "physical") {
                    damage += 3;
                } else {
                    damage -= 5;
                }
                break;
            default:
                console.log("IMPOSSIBLE!");
        }

        // Based on type, add the ability
        if (players[attacker].type.applied == 'offense') {
            eval(players[attacker].type.bonus);
        }

        if (players[defender].type.applied == 'defence') {
            eval(players[defender].type.bonus);
        }

        // RANDOM EVENT
        if (randomInt(0, 100) > 90) {
            let random = randomInt(0, turn.scenario.length);
            let event = turn.scenario[random].function;
            console.log("BREAK THROUGH!");

            eventSignal = true;

            eval(event);

            cause_of_death += "event ";
        }

        // Apply shield to damage
        damage -= shield;

        // If damage bellow 0, go to 0
        if (damage < 0) {
            damage = 0;
        }
        // Deal Damage
        players[defender].hp -= damage;

        if (players[defender].hp <= 0) {
            cause_of_death += "killed";
        }

        //Change HTML to reflect health change
        document.getElementById('health' + players[defender].tribute).innerHTML = `Hp: ${players[defender].hp}`;

        // if turn > 5, change log
        if (turn.round > 10) {
            turn.round = 1;
            logEl.innerHTML = `<li id="log"><strong>Game Log!</strong></li>`;
        }

        if (players[attacker].tribute != players[defender].tribute) {
            text = `<li>${players[attacker].name} attacks ${players[defender].name}, dealing ${damage} damage!</li>`;
            logEl.innerHTML += text;
            log2El.innerHTML += text;
        } else {
            text = `<li>${players[attacker].name} accidently hits themselves, dealing ${damage} damage!</li>`;
            logEl.innerHTML += text;
            log2El.innerHTML += text;
        }


        // REMOVE PLAYER IF DEAD
        for (let i = 0; i < players.length; i++) {

            if (players[i].hp <= 0) {

                if (cause_of_death == "killed") {
                    text = `<li>${players[defender].name} ${players[attacker].wep.deathNote}</li>`;
                    logEl.innerHTML += text;
                    log2El.innerHTML += text;

                    text = `|->${players[defender].name} is dead!`;
                    logEl.innerHTML += text;
                    log2El.innerHTML += text;
                    turn.killedBy.push(players[i].name);

                    players[attacker].kills += 1;
                } else if (cause_of_death == "event ") {
                    text = `<li>${players[i].name} is killed by the event!</li>`;
                    logEl.innerHTML += text;
                    log2El.innerHTML += text;
                    turn.killedBy.push("EVENT");
                } else if (cause_of_death == "event killed") {
                    text = `<li>${players[i].name} is killed by ${players[attacker].name}, helped by the event!</li>`;
                    logEl.innerHTML += text;
                    log2El.innerHTML += text;
                    turn.killedBy.push(`${players[i].name} and EVENT!`);

                    players[attacker].kills += 1;
                }

                document.getElementById(players[i].tribute).innerHTML = '';
                turn.position.push(players[i].name);
                turn.murders.push(players[i].kills);
                turn.turnsAlive.push(turn.storage);
                players.splice(i, 1);
            }

        }

        // // Remove player if they are dead
        // if (players[defender].hp <= 0) {

        //     text = `<li>${players[defender].name} ${players[attacker].wep.deathNote}</li>`;
        //     logEl.innerHTML += text;
        //     log2El.innerHTML += text;

        //     text = `|->${players[defender].name} is dead!`;
        //     logEl.innerHTML += text;
        //     log2El.innerHTML += text;

        //     document.getElementById(players[defender].tribute).innerHTML = '';
        //     turn.position.push(players[defender].name);
        //     players[attacker].kills += 1;
        //     turn.murders.push(players[defender].kills);
        //     turn.killedBy.push(players[attacker].name);
        //     turn.turnsAlive.push(turn.storage);
        //     players.splice(defender, 1);
        // }

    } else {
        logEl.innerHTML = `<strong>The last survivor is: ${players[0].name}! This game lasted ${turn.storage} turns!</strong>`;

        turn.position.push(players[0].name);
        turn.murders.push(players[0].kills);
        turn.killedBy.push("N/A");
        turn.turnsAlive.push(turn.storage);

        for (let i = (NUM_COLS * NUM_ROWS) - 1; i > -1; i--) {
            logEl.innerHTML += `<li>Position: ${i}: Name: ${turn.position[i]} ||| Kills: ${turn.murders[i]} ||| Survived ${turn.turnsAlive[i]} turns! ||| Was killed by: ${turn.killedBy[i]}</li>`;
        }
    }

}


// function damagePlayer() {
//     for (let i = 0; i < (NUM_COLS * NUM_ROWS); i++) {
//         if (players[i].status == 1) {
//             players[i].hp -= randomInt(2, 3);
//             document.getElementById('health' + i).innerHTML = `Hp: ${players[i].hp}`;
//         }
//     }
// }