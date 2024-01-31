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

let isShiny = false;
let isFavorited = false;

//Btn Functions
shinyBtn.addEventListener("click", () =>{

    if(!isShiny){
        isShiny = true;
        shinyBtn.setAttribute("src","../assets/SparkleShiny.png");
    }else{
        isShiny = false;
        shinyBtn.setAttribute("src","../assets/Sparkle.png");
    }
});

heartBtn.addEventListener("click", () => {
    if(!isFavorited){
        isFavorited = true;
        heartBtn.setAttribute("src","../assets/HeartFilled.png");
    }else{
        isFavorited = false;
        heartBtn.setAttribute("src","../assets/Heart.png");
    }
})
//fetch functions