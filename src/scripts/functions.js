//Local Storage Functions

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

//Miscellaneous Functions

const titleCase = (str) => {
    return str.replace(/\w\S*/g, function(word) {
        if(word == "nw" || word == "nw" || word == "sw" || word == "se"){
            return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage, titleCase};