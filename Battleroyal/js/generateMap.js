function generateMap() {
    let mapName;

    mapName = "Island in Ocean";
    turn.scenario.push(
        { name: "Flood", description: "A wild flood comes down!", function: 'for (let i = 0; i < players.length; i++) { if (randomInt(0, 10) > 5) { let dam = 10; players[i].hp -= dam; text = `<li>The Storm deals ${dam} to ${players[i].name}</li>`; logEl.innerHTML += text; log2El.innerHTML += text;}}', last: 3 },
        { name: "Warm Sunlight!", description: "Warmsunlight makes you stronger!", function: 'let dam = 1000; damage += dam; text = `<li>The warm sunlight gives the warrior + ${dam} damage!</li>`; logEl.innerHTML += text; log2El.innerHTML += text;', last: 3 },
        { name: "Prickly Jungle!", description: "The jungle is so full of stuff...", function: 'for (let i = 0; i < players.length; i++) { if (randomInt(0, 3) == 1) { let dam = randomInt(0, 10); players[i].hp -= dam; text = `<span>${players[i]} is dealt ${dam} by stumbling in the overgrown jungle! All damage equals 1.</span>`; logEl.innerHTML += text; log2El.innerHTML += text;} damage = 1; }', last: 3 },
        { name: "Poisonious Frogs!", description: "Deadly animals that can kill you!", function: 'for (let i = 0; i < players.length; i++) { if (randomInt(1, 8) == 1) {players[i].hp = 0}', last: 3 }

    );

    // switch (randomInt(1, 3)) {
    //     case 1: // Island in ocean
    //         mapName = "Island in Ocean";
    //         randomEvent.push(
    //             {name: "Flood", description: "A wild flood comes down!", function: 'for (let i = 0; i < (NUM_COLS * NUM_ROWS); i++) { if (randomInt(0, 10) > 5) { let dam = 10; players[i].hp -= dam; text = `<li>The Storm deals ${dam} to ${players[i].name}</li>`; logEl.innerHTML += text; log2El.innerHTML += text;}}', last: 3},
    //             {name: "Wildlife Attack!", description: "Snarling Bears the size of monsters roam the land!"}, "hide_in_bush", "drown", "scavange_for_berries", "mountain_top", "fishing_village");
    //         break;
    //     case 2: // City
    //         mapName = "Cityscape";
    //         randomEvent.push("destroyed_building", "tunnel", "wrecked_road", "crumbling_floor", "earthquake", "house", "apartment_complex");
    //         break;
    //     case 3: // Floating Island
    //         mapName = "Floating Island";
    //         randomEvent.push("fall", "island_shift", "birds_of_prey", "dragon", "island_collapse", "heavy_wind", "vantage_point");
    // }

    return mapName;
}


