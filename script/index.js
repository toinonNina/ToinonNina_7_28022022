import { recipes } from "./data/recipes.js";
const ingredientsUl = document.getElementById("ingredients-list");
const appareilsUl = document.getElementById("appareils-list");
const ustensilsUl = document.getElementById("ustensiles-list");
const appareilsChevron = document.getElementById("appareils-chevron");
const ustensilsChevron = document.getElementById("ustensiles-chevron");
const ingredientsChevron = document.getElementById("ingredients-chevron");
const cssmodif = document.querySelectorAll(".advanced-search-btn");
const appareilsInput = document.getElementById('appareils');
const ustensilsInput = document.getElementById('ustensiles');
const ingredientsInput = document.getElementById('ingredients');
const mainSearchinput = document.getElementById('main-search');



async function displayRecipes(recipes) {
    const recipesSection = document.querySelector('#recipes-container');

    recipes.forEach((recipe) => {
        const recipeTemplate = recipesFactory(recipe);
        const recipeDom = recipeTemplate.getRecipesDOM();
        recipesSection.appendChild(recipeDom);

    });
}

// Event

ingredientsChevron.addEventListener('click', (e) => {
    if (cssmodif[0].classList.contains('active')) {
        closeList(cssmodif[0]);
        appareilsInput.placeholder = `Ingrédients`;
    } else {
        openList(cssmodif[0]);
        appareilsInput.placeholder = `Appareil`;
        closeList(cssmodif[1]);
        ingredientsInput.placeholder = `Rechercher un ingrédient`;
        closeList(cssmodif[2]);
        ustensilsInput.placeholder = `Ustensiles`;
    }
});

appareilsChevron.addEventListener('click', (e) => {
    if (cssmodif[1].classList.contains('active')) {
        closeList(cssmodif[1]);
        appareilsInput.placeholder = `Appareils`;
    } else {
        openList(cssmodif[1]);
        appareilsInput.placeholder = `Rechercher un appareil`;
        closeList(cssmodif[0]);
        ingredientsInput.placeholder = `Ingrédients`;
        closeList(cssmodif[2]);
        ustensilsInput.placeholder = `Ustensiles`;
    }
});

ustensilsChevron.addEventListener('click', () => {

    if (cssmodif[2].classList.contains('active')) {
        closeList(cssmodif[2]);
        ustensilsInput.placeholder = `Ustensiles`;
    } else {
        openList(cssmodif[2]);
        ustensilsInput.placeholder = `Rechercher un ustensile`;
        closeList(cssmodif[0]);
        ingredientsInput.placeholder = `Ingrédients`;
        closeList(cssmodif[1]);
        appareilsInput.placeholder = `Appareils`;
    }
});


function displayIngredients() {
    let array = [];
    let ingredientsItem = [];
    for (let i = 0; i < recipes.length; i++) {
        array.push(recipes[i].ingredients);
    }

    for (let el in array) {
        for (let j = 0; j < array[el].length; j++) {
            let items = array[el][j].ingredient;
            ingredientsItem.push(items.toLocaleLowerCase());
        };

    }
    let repetitionIngredients = ingredientsItem.filter((item, index) => ingredientsItem.indexOf(item) === index).sort();
    for (let l = 0; l < repetitionIngredients.length; l++) {
        ingredientsUl.innerHTML += `<li class="item ingredients-result" data-value='${repetitionIngredients[l]}'>${repetitionIngredients[l]}</li>`;
    }
}


function displayAppareils() {
    let appareilsItems = [];
    for (let i = 0; i < recipes.length; i++) {
        appareilsItems.push(recipes[i].appliance.toLocaleLowerCase());
    }
    let repetitionAppareils = appareilsItems.filter((item, index) => appareilsItems.indexOf(item) === index).sort();
    for (let j = 0; j < repetitionAppareils.length; j++) {
        appareilsUl.innerHTML += `<li class="item" data-value="${repetitionAppareils[j]}" >${repetitionAppareils[j]}</li>`;
    }
}

function displayUstensils() {
    let ustensilsItem = [];
    for (let k = 0; k < recipes.length; k++) {
        ustensilsItem.push(recipes[k].ustensils[0].toLocaleLowerCase());
    }
    let repetitionUstensils = ustensilsItem.filter((item, index) => ustensilsItem.indexOf(item) === index).sort();
    for (let l = 0; l < repetitionUstensils.length; l++) {
        ustensilsUl.innerHTML += `<li class="item" data-value='${repetitionUstensils[l]}'>${repetitionUstensils[l]}</li>`;
    }
}

function openList(cssmodif) {
    cssmodif.classList.add('active');
}

function closeList(cssmodif) {
    cssmodif.classList.remove('active');
}


function searchMainBar() {
    const mainSearch = document.getElementById('main-search');
    console.log(mainSearch);
    mainSearch.addEventListener('keyup', (e) => {
        const searchString = uniformString(e.target.value.toLowerCase());
        if (searchString.length > 2) {
            const filteredGlobal = recipes.filter((recipe) => {
                return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.appliance).toLowerCase().includes(searchString) ||
                    recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
            });

            console.log(filteredGlobal);
        } else console.log("error");
    });
}

// ingredientsInput.addEventListener('input', () => {
//     if (ingredientsInput.value.length > 2) {
//         recipes.filter((recipe) => {

//         });
//     }
// });

function addFilteredIngredient() {
    const ingredientsResult = document.querySelectorAll(".ingredients-result"); // Ingrédients de la liste
    for (let i = 0; i < ingredientsResult.length; i++) {
        ingredientsResult[i].addEventListener("click", addIngredient);
    }
}

function addIngredient(ingredientEvent) {
    console.log("ok");
    let itemsSelected = ingredientEvent.target.innerText;
    const searchTag = document.querySelector('#search-tag');
    let tagContainer = document.createElement("div");
    tagContainer.classList.add("inlinetag");

    tagContainer.innerHTML = `<div class='items-tag'>${itemsSelected
        }</div> <i class="far fa-times-circle close-button"></i>`;
    searchTag.appendChild(tagContainer);
}


// function uniformString(string) {
//     string = string
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "");

//     string = string.toLowerCase();

//     string = string
//         .replace(/œ/g, "oe")
//         .replace(/æ/g, "ae")
//         .replace(/[']/g, " ");

//     return string;
// }








async function init() {


    displayRecipes(recipes);
    displayAppareils();
    displayUstensils();
    displayIngredients();
    // searchMainBar();
    addFilteredIngredient();
}
init();