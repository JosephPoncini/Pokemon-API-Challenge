//Local Storage Functions

    //Favorites
const saveToLocalStorage = (pokemon) => {
    
    let favorites = getlocalStorage();  
      
    if(!favorites.includes(pokemon)) {
        favorites.push(pokemon);
    }
    
    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

const getlocalStorage = () => {
    
    let localStorageData = localStorage.getItem("Favorites");

    if(localStorageData == null){
        return [];
    }
    
    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (pokemon) => {
    
    let favorites = getlocalStorage();

    let namedIndex = favorites.indexOf(pokemon);

    favorites.splice(namedIndex, 1);

    localStorage.setItem("Favorites", JSON.stringify(favorites))

}

    //shiny

const saveToLocalStorageShiny = (pokemon) => {
    
    let shinies = getlocalStorage();  
      
    if(!shinies.includes(pokemon)) {
        shinies.push(pokemon);
    }
    
    localStorage.setItem("Shiny", JSON.stringify(shinies));
}

const getlocalStorageShiny  = () => {
    
    let localStorageData = localStorage.getItem("Shiny");

    if(localStorageData == null){
        return [];
    }
    
    return JSON.parse(localStorageData);

}

const removeFromLocalStorageShiny  = (pokemon) => {
    
    let shinies = getlocalStorageShiny();

    let namedIndex = shinies.indexOf(pokemon);

    shinies.splice(namedIndex, 1);

    localStorage.setItem("Shiny", JSON.stringify(shinies))

}

//Miscellaneous Functions

const titleCase = (str) => {
    return str.replace(/\w\S*/g, function(word) {
        if(word == "nw" || word == "nw" || word == "sw" || word == "se"){
            return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage, saveToLocalStorageShiny, getlocalStorageShiny, removeFromLocalStorageShiny, titleCase};