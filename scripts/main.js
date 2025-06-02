// ===== Sélection des éléments du DOM =====
const wrapperPokedexHTML = document.querySelector('.wrapper__pokedex');
const btnSearch = document.querySelector('.btn--search');
const btnNext = document.querySelectorAll('.btn--next');
const btnPrevious = document.querySelectorAll('.btn--previous');
const inputSearch = document.getElementById('search');
const inputQuantity = document.getElementById('quantity');
const paginationIndex = document.querySelectorAll('.pagination__text');

// ===== Initialisation de la pagination =====
paginationIndex.forEach(element => {
    element.textContent = `1 - 21 (1 - 1302)`
});
let pokemons;
let pokemonSingle;
let offsetPage = 1;

// ===== Requête API principale (non utilisée) =====
async function getAPI(pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        alert('Erreur :', error);
        console.log('Erreur :', error);
    }
}

// ===== Requête avec offset =====
async function getOffset(offset = 1) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset - 1}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        alert('Erreur :', error);
        console.log('Erreur :', error);
    }
}

// ===== Affichage des Pokémons =====
async function displayPokemons(offset) {
    wrapperPokedexHTML.innerHTML = "";
    pokemons = await getOffset(offset);
    console.log(pokemons);

    for (const element of pokemons) {
        const response = await fetch(element.url);
        const data = await response.json();

        const pokemonName = data.name;
        const pokemonHeight = data.height / 10;
        const pokemonWeight = data.weight / 10;
        const pokemonImg = data.sprites.front_default;
        const pokemonHp = data.stats[0].base_stat;
        const pokemonAtk = data.stats[1].base_stat;
        const pokemonDef = data.stats[2].base_stat;
        const pokemonSpAtk = data.stats[3].base_stat;
        const pokemonSpDef = data.stats[4].base_stat;
        const pokemonSpeed = data.stats[5].base_stat;
        const pokemonTypes = data.types;

        const pokemonContainer = document.createElement('div');
        pokemonContainer.className = "pokemon__single";
        pokemonContainer.innerHTML += `
        <div class="pokemon__sprite">
            <img src="${pokemonImg}" alt="${pokemonImg}">
        </div>
        <div class="pokemon__infos">
            <div class="pokemon__name">${pokemonName}</div>
            <div class="pokemon__types"><span class="subtitle">Type(s): </span></div>
            <div class="pokemon__height"><span class="subtitle">Height: </span>${pokemonHeight} m</div>
            <div class="pokemon__weight"><span class="subtitle">Weight: </span>${pokemonWeight} kg</div>
            <div class="pokemon__stats">
                <span class="subtitle">Stats:</span>  
                <p class="stats__hp">hp: ${pokemonHp}</p>
                <p class="stats__atk">attack: ${pokemonAtk}</p>
                <p class="stats__def">defense: ${pokemonDef}</p>
                <p class="stats__spAtk">special-attack: ${pokemonSpAtk}</p>
                <p class="stats__spDef">special-defense: ${pokemonSpDef}</p>
                <p class="stats__speed">speed: ${pokemonSpeed}</p>
            </div>
        </div>
        `;
        wrapperPokedexHTML.append(pokemonContainer);

        const typesContainer = pokemonContainer.querySelector('.pokemon__types');
        for (const type of pokemonTypes) {
            typesContainer.innerHTML += `<div class="pokemon__type pokemon__type--${type.type.name}">${type.type.name}</div>`;
        }
    }
}

// ===== Affichage d'un Pokémon =====
async function displayPokemonSingle(pokemon) {
    wrapperPokedexHTML.innerHTML = "";
    pokemonSingle = await getAPI(pokemon);
    console.log(pokemons);

    const response = await fetch(pokemon.url);
    const data = await response.json();

    const pokemonName = data.name;
    const pokemonHeight = data.height / 10;
    const pokemonWeight = data.weight / 10;
    const pokemonImg = data.sprites.front_default;
    const pokemonHp = data.stats[0].base_stat;
    const pokemonAtk = data.stats[1].base_stat;
    const pokemonDef = data.stats[2].base_stat;
    const pokemonSpAtk = data.stats[3].base_stat;
    const pokemonSpDef = data.stats[4].base_stat;
    const pokemonSpeed = data.stats[5].base_stat;
    const pokemonTypes = data.types;

    const pokemonContainer = document.createElement('div');
    pokemonContainer.className = "pokemon__single";
    pokemonContainer.innerHTML += `
    <div class="pokemon__sprite">
        <img src="${pokemonImg}" alt="${pokemonImg}">
    </div>
    <div class="pokemon__infos">
        <div class="pokemon__name">${pokemonName}</div>
        <div class="pokemon__types"><span class="subtitle">Type(s): </span></div>
        <div class="pokemon__height"><span class="subtitle">Height: </span>${pokemonHeight} m</div>
        <div class="pokemon__weight"><span class="subtitle">Weight: </span>${pokemonWeight} kg</div>
        <div class="pokemon__stats">
            <span class="subtitle">Stats:</span>  
            <p class="stats__hp">hp: ${pokemonHp}</p>
            <p class="stats__atk">attack: ${pokemonAtk}</p>
            <p class="stats__def">defense: ${pokemonDef}</p>
            <p class="stats__spAtk">special-attack: ${pokemonSpAtk}</p>
            <p class="stats__spDef">special-defense: ${pokemonSpDef}</p>
            <p class="stats__speed">speed: ${pokemonSpeed}</p>
        </div>
    </div>
    `;
    wrapperPokedexHTML.append(pokemonContainer);

    const typesContainer = pokemonContainer.querySelector('.pokemon__types');
    for (const type of pokemonTypes) {
        typesContainer.innerHTML += `<div class="pokemon__type pokemon__type--${type.type.name}">${type.type.name}</div>`;
    }
}

// ===== Affichage initial =====
displayPokemons(offsetPage);

// ===== Événement recherche =====
function searchPokemon(e) {
    console.log(getAPI(e.target.value));
    
}
inputSearch.addEventListener('input', searchPokemon);
btnSearch.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(pokemons);
});

// ===== Pagination suivante =====
btnNext.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (offsetPage + 21 <= 1302) {
            offsetPage += 21;
            paginationIndex.forEach(element => {
                element.textContent = `${offsetPage} - ${Math.min(offsetPage + 20, 1302)} (1 - 1302)`;
            });
            await displayPokemons(offsetPage);
        }
    });
});

// ===== Pagination précédente =====
btnPrevious.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (offsetPage - 21 >= 1) {
            offsetPage -= 21;
            paginationIndex.forEach(element => {
                element.textContent = `${offsetPage} - ${Math.min(offsetPage + 20, 1302)} (1 - 1302)`;
            });
            await displayPokemons(offsetPage);
        }
    });
});
