import { recipes } from "./data/recipes.js";

async function displayRecipes(recipes) {
    const recipesSection = document.querySelector('#recipes-container');

    recipes.forEach((recipe) => {
        const recipeTemplate = recipesFactory(recipe);
        const recipeDom = recipeTemplate.getRecipesDOM();
        recipesSection.appendChild(recipeDom);

    });
}


function getAllArray(recipes) {
    let arrayrecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        arrayrecipes.push({
            recipe: recipe,
            ingredients: recipe.ingredients,
            appliance: recipe.appliance,
            ustensils: recipe.ustensils
        });

    }
}


async function init() {


    displayRecipes(recipes);
    getAllArray(recipes);
}
init();