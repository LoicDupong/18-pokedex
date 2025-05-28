const wrapperPokedexHTML = document.querySelector('.wrapper__pokedex');
const btn = document.querySelector('.btn');
const inputSearch = document.getElementById('search');
const inputQuantity = document.getElementById('quantity');
let pokemons;
let pokemonsIndex;

async function getAPI() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
        const data = await response.json();
        return data.results
    } catch (error) {
        alert('Erreur :', error);
        console.log('Erreur :', error);
    }
}
async function getIndexAPI(index = "") {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        const data = await response.json();
        return data
    } catch (error) {
        alert('Erreur :', error);
        console.log('Erreur :', error);
    }
}
async function getOffset(offset = 0) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        const data = await response.json();
        return data
    } catch (error) {
        alert('Erreur :', error);
        console.log('Erreur :', error);
    }
}



async function displayPokemons() {
    pokemons = await getAPI();
    console.log(pokemons);
    
    for (const element of pokemons) {
        const response = await fetch(element.url)
        const data = await response.json()

        const pokemonName = data.name;
        const pokemonHeight = data.height;
        const pokemonWeight = data.weight;
        const pokemonImg = data.sprites.front_default;
        const pokemonHp = data.stats[0].base_stat
        const pokemonAtk = data.stats[1].base_stat
        const pokemonDef = data.stats[2].base_stat
        const pokemonSpAtk = data.stats[3].base_stat
        const pokemonSpDef = data.stats[4].base_stat
        const pokemonSpeed = data.stats[5].base_stat
        const pokemonTypes = data.types;

    
        const pokemonContainer = document.createElement('div');
        pokemonContainer.className = "pokemon__single";
        pokemonContainer.innerHTML += `
<div class="pokemon__sprite">
<img src="${pokemonImg}" alt="${pokemonImg}">
</div>
<div class="pokemon__infos">
    <div class="pokemon__name">${pokemonName}</div>
    <div class="pokemon__types"><span class="subtitle">Type(s):</span></div>
    <div class="pokemon__height"><span class="subtitle">Height:</span>${pokemonHeight} m</div>
    <div class="pokemon__weight"><span class="subtitle">Weight:</span>${pokemonWeight} kg</div>
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

        `
        wrapperPokedexHTML.append(pokemonContainer);  
        console.log(data);
        const typesContainer = pokemonContainer.querySelector('.pokemon__types');
        for (const type of pokemonTypes) {

            typesContainer.innerHTML += `<div class="pokemon__type pokemon__type--${type.type.name}">${type.type.name}</div>`;
            
        };
        
    }  
    
}

displayPokemons();

btn.addEventListener('click', async (e)=> {
    e.preventDefault();
    // const name = inputSearch.value;
    // const limit = inputQuantity.value;
    
    console.log(pokemons);
        
    
})