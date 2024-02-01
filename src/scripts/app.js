import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage, titleCase, saveToLocalStorageShiny, getlocalStorageShiny, removeFromLocalStorageShiny } from "./functions.js"

//Initialize Things from documnet

//Initialize Btns/Forms
let search = document.getElementById("search");
let randomBtn = document.getElementById("randomBtn");
let searchBtn = document.getElementById("searchBtn");
// let favoritesBtn = document.getElementById("favoritesBtn");
let shinyBtn = document.getElementById("shinyBtn");
let heartBtn = document.getElementById("heartBtn");

//Initialize Elements
let favoritesContainer = document.getElementById("favoritesContainer");
let pokemonImage = document.getElementById("pokemonImage");
let indexNumber = document.getElementById("indexNumber");
let pokemonTitle = document.getElementById("pokemonTitle");
let descriptionTxt = document.getElementById("descriptionTxt");
let evolutionContainer = document.getElementById("evolutionContainer");
let genTxt = document.getElementById("genTxt");
let typeContainer = document.getElementById("typeContainer");
let locationTxt = document.getElementById("locationTxt");
let abilitiesTxt = document.getElementById("abilitiesTxt");
let movesTxt = document.getElementById("movesTxt");

//Initialize variables

let pokemon;
let pokemonSpecies;
let pokemonEncounter;
let pokemonEvolutionChain;
let pokemonGlobalName = "Pikachu";
let pokemonGlobalID = "#25";

let isShiny = false;
let isFavorited = false;

//Btn Functions

randomBtn.addEventListener("click", async () => {
    let randNum = Math.floor(Math.random() * 919) + 1;

    await LoadOut(`${randNum}`)
    search.value = pokemonGlobalName;

})

shinyBtn.addEventListener("click", () => {

    if (!isShiny) {
        isShiny = true;
        shinyBtn.src = "../assets/SparkleShiny.png";
        pokemonImage.src = pokemon.sprites.other["official-artwork"].front_shiny;
        saveToLocalStorageShiny(pokemon.name);
        GetEvolutions();
    } else {
        isShiny = false;
        shinyBtn.src = "../assets/Sparkle.png";
        pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;
        removeFromLocalStorageShiny(pokemon.name)
        GetEvolutions();
    }
});

heartBtn.addEventListener("click", () => {

    heart();

})

const heart = () => {
    if (!isFavorited) {
        isFavorited = true;
        heartBtn.src = "../assets/HeartFilled.png";
        saveToLocalStorage(pokemonGlobalName + "," + pokemonGlobalID);
        RefreshFavorites();

    } else {
        isFavorited = false;
        heartBtn.src = "../assets/Heart.png";
        removeFromLocalStorage(pokemonGlobalName + "," + pokemonGlobalID)
        RefreshFavorites();
    }
}

const RefreshFavorites = () => {
    let favorites = getlocalStorage();
    favoritesContainer.innerHTML = "";
    favorites.forEach(x => {
        let y = x.split(',');
        let pokemonName = y[0];
        let pokemonID = y[1];
        AddToFavorites(pokemonName, pokemonID);
    })
}

const AddToFavorites = (pokemonName, pokemonID) => {
    const newFavorite = document.createElement("div");
    newFavorite.classList = "flex justify-between border-black border-t-2 px-2";

    const pokemonCell = document.createElement("div");
    pokemonCell.classList = "cursor-pointer flex justify-between w-[87%]"

    pokemonCell.addEventListener("click", async () => {
        await LoadOut(pokemonName);
        search.value = pokemonGlobalName;
    })

    const favoritePokemon = document.createElement("div");
    favoritePokemon.innerText = pokemonName;

    const favoritePokemonID = document.createElement("div");
    favoritePokemonID.innerText = pokemonID;

    const exitBtn = document.createElement("strong");
    exitBtn.classList = "text-red-600";
    exitBtn.innerText = "X"



    exitBtn.addEventListener("click", () => {

        removeFromLocalStorage(pokemonName + "," + pokemonID)
        newFavorite.remove();
        let favorites = getlocalStorage();
        if (favorites.includes(pokemonGlobalName + "," + pokemonGlobalID)) {
            isFavorited = true;
            heartBtn.src = "../assets/HeartFilled.png";
        } else {
            isFavorited = false;
            heartBtn.src = "../assets/Heart.png";
        };
    });

    pokemonCell.appendChild(favoritePokemon);
    pokemonCell.appendChild(favoritePokemonID);


    newFavorite.appendChild(pokemonCell);

    newFavorite.appendChild(exitBtn);

    favoritesContainer.appendChild(newFavorite);
}

//search functions

searchBtn.addEventListener('click', async (event) => {
    //On enter I want this function to run

    let pokemonName = search.value;
    await LoadOut(pokemonName);
})

search.addEventListener('keydown', async (event) => {
    //On enter I want this function to run
    if (event.key === "Enter") {

        let pokemonName = event.target.value;
        await LoadOut(pokemonName);
    }
})

const LoadOut = async (pokemonName) => {
    pokemonName = pokemonName.toLowerCase();
    pokemonSpecies = await pokemonSpeciesApi(pokemonName);
    pokemon = await pokemonApi(pokemonName);
    pokemonEncounter = await pokemonEncounterApi(pokemonName);
    let url = pokemonSpecies.evolution_chain.url;
    pokemonEvolutionChain = await pokemonEvolutionChainApi(url);


    pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;

    pokemonGlobalID = "#" + pokemon.id;
    indexNumber.innerText = pokemonGlobalID;

    pokemonGlobalName = titleCase(pokemon.name);
    pokemonTitle.innerText = pokemonGlobalName;

    descriptionTxt.innerText = GetDescription();
    genTxt.innerText = GetGeneration();
    locationTxt.innerText = GetLocation();
    abilitiesTxt.innerText = GetAbilities();
    movesTxt.innerText = GetMoves();
    GetTypes();
    GetEvolutions();

    let shinies = getlocalStorageShiny();
    let favorites = getlocalStorage();

    if (shinies.includes(pokemon.name)) {
        isShiny = true;
        shinyBtn.src = "../assets/SparkleShiny.png";
        pokemonImage.src = pokemon.sprites.other["official-artwork"].front_shiny;
    } else {
        isShiny = false;
        shinyBtn.src = "../assets/Sparkle.png";
        pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;
    };

    if (favorites.includes(pokemonGlobalName + "," + pokemonGlobalID)) {
        isFavorited = true;
        heartBtn.src = "../assets/HeartFilled.png";
    } else {
        isFavorited = false;
        heartBtn.src = "../assets/Heart.png";
    };
}

//Get Functions

const GetDescription = () => {
    let randomEntryLocation;
    do {
        randomEntryLocation = Math.floor(Math.random() * pokemonSpecies.flavor_text_entries.length);
    } while (pokemonSpecies.flavor_text_entries[randomEntryLocation].language.name != "en")

    return pokemonSpecies.flavor_text_entries[randomEntryLocation].flavor_text.replaceAll("\f", " ").replaceAll("\n", " ");
}

const GetGeneration = () => {

    let gen = "??";
    let generation = pokemonSpecies.generation.name;
    switch (generation) {
        case "generation-i":
            gen = "1st";
            break;
        case "generation-ii":
            gen = "2nd";
            break;
        case "generation-iii":
            gen = "3rd";
            break;
        case "generation-iv":
            gen = "4th";
            break;
        case "generation-v":
            gen = "5th";
            break;
        case "generation-vi":
            gen = "6th";
            break;
        case "generation-vii":
            gen = "7th";
            break;
        case "generation-viii":
            gen = "8th";
            break;
        case "generation-ix":
            gen = "9th";
            break;
        default:
            gen = "???";
    }

    return gen;
}

const GetLocation = () => {
    let location = "N/A";

    if (pokemonEncounter[0]) {
        let randomLocationIndex = Math.floor(Math.random() * pokemonEncounter.length);


        location = titleCase(pokemonEncounter[randomLocationIndex].location_area.name.replaceAll("-", " ")) + " from " + titleCase(pokemonEncounter[randomLocationIndex].version_details[0].version.name);

    }

    return location;
}

const GetAbilities = () => {
    let abilities = "";
    if (pokemon.abilities[0]) {
        pokemon.abilities.forEach(x => {
            abilities += x.ability.name + ", ";
        })
    }
    return titleCase(abilities.substring(0, abilities.length - 2));

}

const GetMoves = () => {
    let moves = "";
    if (pokemon.moves[0]) {
        pokemon.moves.forEach(x => {
            moves += x.move.name + ", ";
        })
    }
    return titleCase(moves.substring(0, moves.length - 2));
}

const GetTypes = () => {
    let typeArray = [];
    let newImg;

    typeContainer.innerHTML = "";

    if (pokemon.types[0]) {
        pokemon.types.forEach(x => {

            newImg = document.createElement("img");
            newImg.src = "../assets/elementTypes/" + x.type.name + ".png";
            newImg.className = "h-[30px] pr-5";

            typeContainer.appendChild(newImg);


            typeArray.push(x.type.name);
        })

    }
    console.log(typeArray);
}

const GetEvolutions = async () => {
    console.log("here")
    evolutionContainer.innerHTML = "";

    let evolution = pokemonEvolutionChain.chain;

    if (evolution.evolves_to[0]) {
        let counter = 0;
        let anotherBranch = false;
        while (evolution.evolves_to[counter] || anotherBranch) {

            let evolutionLine = document.createElement("div");

            const GetNextEvo = async (evolution) => {

                let pokemonEvoGif = document.createElement("img");
                pokemonEvoGif.classList = "w-[75px]";
                let pokemonEvoTitle = document.createElement("div");
                pokemonEvoTitle.classList = "flex justify-center";
                let arrowContainer = document.createElement("div");
                arrowContainer.classList = "flex items-center mx-5";
                let arrow = document.createElement("div");
                arrow.innerText = "=>";
                arrow.classList = "text-3xl"
                let pokemonContainer = document.createElement("div");
                pokemonContainer.classList = "flex flex-col justify-end cursor-pointer";

                pokemonContainer.addEventListener("click", async () => {
                    await LoadOut(`${evolution.species.name}`)
                    search.value = evolution.species.name;
                })


                arrowContainer.appendChild(arrow);
                evolutionLine.appendChild(arrowContainer);
                pokemonEvoGif.src = await GetSprite(evolution.species.name);
                pokemonEvoTitle.innerText = evolution.species.name;
                pokemonContainer.appendChild(pokemonEvoGif);
                pokemonContainer.appendChild(pokemonEvoTitle);
                evolutionLine.appendChild(pokemonContainer);
                evolutionLine.className = "flex flex-row justify-center";

                let counter = 0;

                if (anotherBranch) {
                    counter++;
                    anotherBranch = false;
                }

                if (evolution.evolves_to[counter]) {

                    await GetNextEvo(evolution.evolves_to[counter])
                    counter++;
                }
                if (evolution.evolves_to[counter]) {
                    anotherBranch = true;
                }

                evolutionContainer.appendChild(evolutionLine);
            }
            let pokemonEvoGif = document.createElement("img");
            pokemonEvoGif.classList = "w-[75px]";
            let pokemonEvoTitle = document.createElement("div");
            pokemonEvoTitle.classList = "flex justify-center";
            let pokemonContainer = document.createElement("div");
            pokemonContainer.classList = "flex flex-col justify-end cursor-pointer";
            pokemonContainer.addEventListener("click", async () => {
                await LoadOut(`${evolution.species.name}`)
                search.value = evolution.species.name;
            })

            await GetNextEvo(evolution.evolves_to[counter])


            pokemonEvoGif.src = await GetSprite(evolution.species.name);
            pokemonEvoTitle.innerText = evolution.species.name;
            pokemonContainer.appendChild(pokemonEvoGif);
            pokemonContainer.appendChild(pokemonEvoTitle);
            evolutionLine.insertBefore(pokemonContainer, evolutionLine.firstChild);
            evolutionContainer.appendChild(evolutionLine);
            evolutionLine.className = "flex flex-row justify-center";
            if (!anotherBranch) { counter++; };


        }
    } else {
        let evolutionLine = document.createElement("div");
        let pokemonEvoGif = document.createElement("img");
        pokemonEvoGif.classList = "w-[75px]";
        let pokemonEvoTitle = document.createElement("div");
        pokemonEvoTitle.classList = "flex justify-center";
        let pokemonContainer = document.createElement("div");
        pokemonContainer.classList = "flex flex-col justify-end";


        pokemonEvoGif.src = await GetSprite(evolution.species.name);
        pokemonEvoTitle.innerText = evolution.species.name;
        pokemonContainer.appendChild(pokemonEvoGif);
        pokemonContainer.appendChild(pokemonEvoTitle);
        evolutionLine.insertBefore(pokemonContainer, evolutionLine.firstChild);
        evolutionContainer.appendChild(evolutionLine);
        evolutionLine.className = "flex flex-row justify-center";
    }


}

const GetSprite = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    const data = await promise.json();

    return isShiny ? data.sprites.other.showdown.front_shiny : data.sprites.other.showdown.front_default
}

//fetch functions

const pokemonApi = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    const data = await promise.json();
    return data;
}

const pokemonSpeciesApi = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon);
    const data = await promise.json();
    return data;
}

const pokemonEncounterApi = async (pokemon) => {
    const promise = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon + "/encounters");
    const data = await promise.json();
    return data;
}

const pokemonEvolutionChainApi = async (url) => {
    const promise = await fetch(url);
    const data = await promise.json();
    return data;
}


LoadOut(pokemonGlobalName)
search.value = "pikachu";
RefreshFavorites();



