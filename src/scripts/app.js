import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage, titleCase } from "./functions.js"

//Initialize Things from documnet

//Initialize Btns/Forms
let search = document.getElementById("search");
let randomBtn = document.getElementById("randomBtn");
let searchBtn = document.getElementById("searchBtn");
let favoritesBtn = document.getElementById("favoritesBtn");
let shinyBtn = document.getElementById("shinyBtn");
let heartBtn = document.getElementById("heartBtn");

//Initialize Elements
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
let pokemonName = "pikachu";

let isShiny = false;
let isFavorited = false;

//Btn Functions
shinyBtn.addEventListener("click", () => {

    if (!isShiny) {
        isShiny = true;
        shinyBtn.src = "../assets/SparkleShiny.png";
        pokemonImage.src = pokemon.sprites.other["official-artwork"].front_shiny;
        GetEvolutions();
    } else {
        isShiny = false;
        shinyBtn.src = "../assets/Sparkle.png";
        pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;
        GetEvolutions();
    }
});

heartBtn.addEventListener("click", () => {
    if (!isFavorited) {
        isFavorited = true;
        heartBtn.src = "../assets/HeartFilled.png";
        saveToLocalStorage(pokemon.name);
    } else {
        isFavorited = false;
        heartBtn.src = "../assets/Heart.png";
        removeFromLocalStorage(pokemon.name)
    }
})

favoritesBtn.addEventListener('click', () => {
    //This retrieves our data from local storage and stores it into favorites variable.
    let favorites = getlocalStorage();

    // Clears getFAvoritesDiv so the Array display will not constantly repeat.
    getFavoritesDiv.textContent = "";

    //map through each element in our array 
    favorites.map(digiName => {
        //Creating a P-tag Dynamically
        let p = document.createElement('p');

        //Setting its text content to digiName
        p.textContent = digiName;

        // className replaces all classes with out new classes
        p.className = "text-lg font-medium text-gray-900 dark:text-white";

        //Creating a button dynamically
        let button = document.createElement('button');

        button.type = "button"
        button.textContent = "X";

        //classList allows us to be a little more concise it doesn't replace all classes.
        button.classList.add(
            "text-gray-400",
            "bg-transparent",
            "hover:bg-gray-200",
            "hover:text-gray-900",
            "rounded-lg",
            "text-sm",
            "w-8",
            "h-8",
            "justify-end",
            "dark:hover:bg-gray-600",
            "dark:hover:text-white"
        );

        //creating an addEventListner for our button which removes digiName from our favorites
        button.addEventListener('click', () => {

            removeFromLocalStorage(digiName);

            p.remove();
        })
        // appending our button to our p-tag
        p.append(button);
        //appending our p-tag to our FavoritesDiv
        getFavoritesDiv.append(p);
    })


})

//search functions



searchBtn.addEventListener('click', async (event) => {
    //On enter I want this function to run

    let pokemonName = search.value.toLowerCase();


    pokemonSpecies = await pokemonSpeciesApi(pokemonName);
    pokemon = await pokemonApi(pokemonName);
    pokemonEncounter = await pokemonEncounterApi(pokemonName);
    let url = pokemonSpecies.evolution_chain.url;
    pokemonEvolutionChain = await pokemonEvolutionChainApi(url);


    pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;
    indexNumber.innerText = "#" + pokemon.id;
    pokemonTitle.innerText = titleCase(pokemon.name);

    descriptionTxt.innerText = GetDescription();
    genTxt.innerText = GetGeneration();
    locationTxt.innerText = GetLocation();
    abilitiesTxt.innerText = GetAbilities();
    movesTxt.innerText = GetMoves();
    GetTypes();
    GetEvolutions();
})

search.addEventListener('keydown', async (event) => {
    //On enter I want this function to run
    if (event.key === "Enter") {

        let pokemonName = event.target.value.toLowerCase();

        pokemonSpecies = await pokemonSpeciesApi(pokemonName);
        pokemon = await pokemonApi(pokemonName);
        pokemonEncounter = await pokemonEncounterApi(pokemonName);
        let url = pokemonSpecies.evolution_chain.url;
        pokemonEvolutionChain = await pokemonEvolutionChainApi(url);


        pokemonImage.src = pokemon.sprites.other["official-artwork"].front_default;
        indexNumber.innerText = "#" + pokemon.id;
        pokemonTitle.innerText = titleCase(pokemon.name);

        descriptionTxt.innerText = GetDescription();
        genTxt.innerText = GetGeneration();
        locationTxt.innerText = GetLocation();
        abilitiesTxt.innerText = GetAbilities();
        movesTxt.innerText = GetMoves();
        GetTypes();
        GetEvolutions();
    }
})


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
    if (pokemon.game_indices[0]) {
        let game = pokemon.game_indices[0].version.name;
        switch (game) {
            case "red":
                gen = "1st";
                break;
            case "blue":
                gen = "1st";
                break;
            case "yellow":
                gen = "1st";
                break;
            case "gold":
                gen = "2nd";
                break;
            case "silver":
                gen = "2nd";
                break;
            case "crystal":
                gen = "2nd";
                break;
            case "ruby":
                gen = "3rd";
                break;
            case "sapphire":
                gen = "3rd";
                break;
            case "emerald":
                gen = "3rd";
                break;
            case "firered":
                gen = "1st";
                break;
            case "leafgreen":
                gen = "1st";
                break;
            case "diamond":
                gen = "4th";
                break;
            case "pearl":
                gen = "4th";
                break;
            case "platinum":
                gen = "4th";
                break;
            case "heartgold":
                gen = "2nd";
                break;
            case "soulsilver":
                gen = "2nd";
                break;
            case "black":
                gen = "5th";
                break;
            case "white":
                gen = "5th";
                break;
            case "black-2":
                gen = "5th";
                break;
            case "white-2":
                gen = "5th";
                break;
            default:
                gen = "???";
        }
    }


    return gen;
}

const GetLocation = () => {
    let location = "N/A";

    if (pokemonEncounter[0]) {
        let randomLocationIndex = Math.floor(Math.random() * pokemonEncounter.length);


        location = titleCase(pokemonEncounter[randomLocationIndex].location_area.name.replaceAll("-", " ")) + " from Pokèmon " + titleCase(pokemonEncounter[randomLocationIndex].version_details[0].version.name);

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

    if(evolution.evolves_to[0]){
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
            pokemonContainer.classList = "flex flex-col justify-end";


            arrowContainer.appendChild(arrow);
            evolutionLine.appendChild(arrowContainer);
            pokemonEvoGif.src = await GetSprite(evolution.species.name);
            pokemonEvoTitle.innerText = evolution.species.name;
            pokemonContainer.appendChild(pokemonEvoGif);
            pokemonContainer.appendChild(pokemonEvoTitle);
            evolutionLine.appendChild(pokemonContainer);
            evolutionLine.className = "flex flex-row justify-center";

            let counter = 0;

            if(anotherBranch){
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
        pokemonContainer.classList = "flex flex-col justify-end";
        await GetNextEvo(evolution.evolves_to[counter])


        pokemonEvoGif.src = await GetSprite(evolution.species.name);
        pokemonEvoTitle.innerText = evolution.species.name;
        pokemonContainer.appendChild(pokemonEvoGif);
        pokemonContainer.appendChild(pokemonEvoTitle);
        evolutionLine.insertBefore(pokemonContainer, evolutionLine.firstChild);
        evolutionContainer.appendChild(evolutionLine);
        evolutionLine.className = "flex flex-row justify-center";
        if(!anotherBranch){counter++;};


    }
    }else{
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


pokemon = await pokemonApi(pokemonName);
pokemonSpecies = await pokemonSpeciesApi(pokemonName);
pokemonEncounter = await pokemonEncounterApi(pokemonName);

// console.log(pokemon);
// console.log(pokemonSpecies)
// console.log(pokemonEncounter)



