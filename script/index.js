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
const recipesSection = document.querySelector('#recipes-container');
let tagArrayselected = [];
let tagitems = document.querySelectorAll('.tag');
let repetitionIngredients = [];
let filterrecipes;
let newfilterrecipes;


console.log(recipes);

async function displayRecipes(recipes) {

    recipesSection.innerHTML = '';
    recipes.forEach((item) => {
        const recipeTemplate = recipesFactory(item);
        const recipeDom = recipeTemplate.getRecipesDOM();
        recipesSection.appendChild(recipeDom);

    });
}

// Event

ingredientsChevron.addEventListener('click', (e) => {
    if (cssmodif[0].classList.contains('active')) {
        closeList(cssmodif[0]);
        ingredientsInput.placeholder = `Ingrédients`;
    } else {
        openList(cssmodif[0]);
        ingredientsInput.placeholder = `Rechercher un ingrédient`;
        closeList(cssmodif[1]);
        appareilsInput.placeholder = `Appareil`;
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

function displayIngredients(recipes) {
    let array = [];
    let ingredientsItem = [];
    ingredientsUl.innerHTML = "";
    for (let i = 0; i < recipes.length; i++) {
        array.push(recipes[i].ingredients);
    }

    for (let el in array) {
        for (let j = 0; j < array[el].length; j++) {
            let items = array[el][j].ingredient;
            ingredientsItem.push(items.toLowerCase());

        };

    }
    repetitionIngredients = ingredientsItem.filter((item, index) => ingredientsItem.indexOf(item) === index).sort();
    for (let l = 0; l < repetitionIngredients.length; l++) {
        ingredientsUl.innerHTML += `<li class="item ingredients-result" data-value='${repetitionIngredients[l]}'>${repetitionIngredients[l]}</li>`;

    }

}

function displayAppareils(recipes) {

    let appareilsItems = [];
    appareilsUl.innerHTML = '';
    for (let i = 0; i < recipes.length; i++) {
        appareilsItems.push(recipes[i].appliance.toLowerCase());
    }
    let repetitionAppareils = appareilsItems.filter((item, index) => appareilsItems.indexOf(item) === index).sort();
    for (let j = 0; j < repetitionAppareils.length; j++) {
        appareilsUl.innerHTML += `<li class="item" data-value="${repetitionAppareils[j]}" >${repetitionAppareils[j]}</li>`;
    }
}

function displayUstensils(recipes) {
    let array = [];
    let ustensilsItem = [];
    ustensilsUl.innerHTML = '';
    for (let k = 0; k < recipes.length; k++) {
        array.push(recipes[k].ustensils);
    }
    for (let el in array) {
        for (let j = 0; j < array[el].length; j++) {
            let items = array[el][j];
            ustensilsItem.push(items.toLowerCase());

        };

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

function updatemedia(items) {
    displayRecipes(items);

}



function addTagIngredient() {
    const ingredientsResult = document.querySelectorAll(".ingredients-result"); // Ingrédients de la liste
    for (let i = 0; i < ingredientsResult.length; i++) {
        ingredientsResult[i].removeEventListener("click", addIngredient, );
        ingredientsResult[i].addEventListener("click", addIngredient, );


    }

}

function addIngredient(ingredientEvent) {

    let itemsSelected = ingredientEvent.target.innerText;
    const searchTag = document.querySelector('#search-tag');
    let tagContainer = document.createElement("div");
    tagContainer.innerHTML = '';
    tagContainer.classList.add("ingredients-inlinetag");
    tagContainer.classList.add("active");
    tagContainer.innerHTML = `<div class='items-ingredients tag'>${itemsSelected}</div> <i class="far fa-times-circle close-button"></i>`;
    searchTag.appendChild(tagContainer);
    closeList(cssmodif[0]);

    tagArrayselected.push(itemsSelected);
    console.log(tagArrayselected);

    filterrecipes = recipes.filter((recipe) => {

        return (recipe.ingredients.some((el) =>
            uniformString(el.ingredient).includes(itemsSelected)
        ));
    });


    updatemedia(filterrecipes);
    console.log(filterrecipes);
    displayIngredients(filterrecipes);
    displayAppareils(filterrecipes);
    displayUstensils(filterrecipes);
    // repetitionIngredients = recipe.ingredients.filter((ingredient) => ingredient != itemsSelected);
    // console.log(repetitionIngredients);
    addTagIngredient();
    closeTag();

    ingredientsInput.placeholder = `Ingrédients`;
}

function closeTag() {
    const closeTags = document.querySelectorAll('.close-button');

    for (let i = 0; i < closeTags.length; i++) {
        const element = closeTags[i];
        element.addEventListener('click', RemoveClassActive);
    }
}

function RemoveClassActive(button) {
    let btnclose = button.target;
    btnclose.parentElement.classList.remove('active');
    let item = btnclose.previousElementSibling.innerHTML;
    tagArrayselected = tagArrayselected.filter((tag) => tag != item);
    console.log(tagArrayselected);
    if (btnclose.parentElement.classList.contains('ingredients-inlinetag')) {
        newfilterrecipes = filterrecipes.filter((ingredient) => ingredient != item);

    }
    updatemedia(newfilterrecipes);
    console.log(newfilterrecipes);


}

function searchIngredient() {
    ingredientsInput.addEventListener('keyup', (e) => {
        openList(cssmodif[0]);
        ingredientsInput.placeholder = `Rechercher un ingrédient`;
        let ingredientString = uniformString(e.target.value.toLowerCase());
        if (ingredientString.length >= 3) {
            filteredIngredients = recipes.filter((recipe) => {
                return (recipe.ingredients.some((el) => uniformString(el.ingredient).includes(ingredientString)));
            });
            updatemedia(filteredIngredients);
            displayIngredients(filteredIngredients);
            addTagIngredient();
            ingredientsInput.placeholder = `Ingrédients`;
            console.log(filteredIngredients);
        }

    });
}

function searchMainBar() {

    mainSearchinput.addEventListener('keyup', (e) => {
        let filteredGlobal;
        let filterbyTag;
        let itemstag;
        const searchString = uniformString(e.target.value.toLowerCase());
        if (searchString.length >= 3) {
            if (tagArrayselected.length != 0) {
                updatemedia(filterrecipes);
                filteredGlobal = filterrecipes.filter((recipe) => {
                    return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.description).toLowerCase().includes(searchString) ||
                        recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
                });
                console.log('ok');
                updatemedia(filteredGlobal);
                displayIngredients(filteredGlobal);
                displayAppareils(filteredGlobal);
                displayUstensils(filteredGlobal);
            }
            if (tagArrayselected.length === 0) {
                filteredGlobal = recipes.filter((recipe) => {
                    return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.description).toLowerCase().includes(searchString) ||
                        recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
                });
                updatemedia(filteredGlobal);
                displayIngredients(filteredGlobal);
                displayAppareils(filteredGlobal);
                displayUstensils(filteredGlobal);

            }
            // filteredGlobal = recipes.filter((recipe) => {
            //     return (uniformString(recipe.name).toLowerCase().includes(searchString) || uniformString(recipe.description).toLowerCase().includes(searchString) ||
            //         recipe.ingredients.some((el) => uniformString(el.ingredient).includes(searchString)));
            // });
            // updatemedia(filteredGlobal);
            // displayIngredients(filteredGlobal);
            // displayAppareils(filteredGlobal);
            // displayUstensils(filteredGlobal);

        } else {
            console.log("ERROR");
        }

    });
}



function uniformString(string) {
    string = string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    string = string.toLowerCase();

    string = string
        .replace(/œ/g, "oe")
        .replace(/æ/g, "ae")
        .replace(/[']/g, " ");

    return string;
}








async function init() {

    searchMainBar();
    displayRecipes(recipes);
    displayAppareils(recipes);
    displayUstensils(recipes);
    displayIngredients(recipes);
    searchIngredient();

    addTagIngredient();
}
init();