// Classe Recipe
function Recipe(title) {
    this.title = title;
    this.ingredients = []; // Tableau pour les ingrédients
    this.steps = []; // Tableau pour les étapes
}

// Méthode cook()
Recipe.prototype.cook = function() {
    let recipeString = "<h2>" + this.title + "</h2>"; 

    // Afficher les ingrédients
    if (this.ingredients.length > 0) {
        recipeString += "<h3>Ingrédients :</h3><ul>";
        for (let i = 0; i < this.ingredients.length; i++) {
            const ingredient = this.ingredients[i];
            recipeString += "<li>" + ingredient[0] + " " + ingredient[1] + " de " + ingredient[2] + " (" + ingredient[3] + ")</li>";
        }
        recipeString += "</ul>";
    } else {
        recipeString += "<h3>Ingrédients :</h3><p>Aucun ingrédient ajouté.</p>"; // Message si pas d'ingrédients
    }

    // Afficher les étapes
    if (this.steps.length > 0) {
        recipeString += "<h3>Étapes :</h3><ol>";
        for (let i = 0; i < this.steps.length; i++) {
            recipeString += "<li>" + this.steps[i] + "</li>";
        }
        recipeString += "</ol>";
    } else {
        recipeString += "<h3>Étapes :</h3><p>Aucune étape ajoutée.</p>"; // Message si pas d'étapes
    }

    recipeString += "<br/>Bon appétit ! #les_trois_étoiles_pour_philou";
    return recipeString; 
};

// Fonction pour initialiser la recette des cookies végans
function initializeVeganCookies() {
    const veganCookies = new Recipe("Les Meilleurs Cookies Végans au Chocolat");
    veganCookies.ingredients = [
        [1, "tasse", "farine blanche", "sec"],
        [0.5, "cuil. à café", "bicarbonate de soude", "humide"],
        [0.25, "cuil. à café", "sel", "sec"],
        [0.25, "tasse", "sucre", "sec"],
        [0.25, "tasse", "sucre brun", "sec"],
        [0.33, "tasse", "pépites de chocolat", "sec"],
        [2, "cuil. à soupe", "lait de soja", "humide"],
        [2, "cuil. à soupe", "huile", "humide"],
        [0.25, "cuil. à café", "extrait de vanille pure", "sec"],
    ];
    veganCookies.steps = [
        "Former une grande boule, puis soit réfrigérer pendant au moins 2 heures, soit congeler jusqu'à ce que la pâte soit froide. Une fois la pâte refroidie, préchauffer le four à 325 °F.",
        "Former des boules de pâte et les placer sur une plaque de cuisson graissée, en laissant suffisamment d'espace entre les cookies pour qu'ils puissent s'étendre.",
        "Cuire au four pendant 10 minutes."
    ];
    return veganCookies;
}

// Instanciation des recettes
let defaultRecipes = [initializeVeganCookies()]; // Recettes par défaut dans un tableau
let currentRecipe; // Variable pour stocker la recette actuelle
let allRecipes = []; // Tableau pour stocker toutes les recettes

// Ajouter des ingrédients
document.getElementById("addIngredient").addEventListener("click", function() {
    const quantity = parseFloat(document.getElementById("ingredient-quantity").value);
    const unit = document.getElementById("ingredient-unit").value;
    const name = document.getElementById("ingredient-name").value;
    const type = document.getElementById("ingredient-type").value;

    // Validation des champs d'ingrédients
    if (isNaN(quantity) || unit.trim() === "" || name.trim() === "" || type.trim() === "") {
        alert("Veuillez remplir tous les champs d'ingrédients.");
        return;
    }

    // Si aucune recette actuelle n'est sélectionnée, créer une nouvelle recette
    if (!currentRecipe) {
        currentRecipe = new Recipe("Nouvelle Recette"); // Créer une nouvelle recette
    }

    // Ajouter l'ingrédient au tableau
    currentRecipe.ingredients.push([quantity, unit, name, type]);

    // Réinitialiser les champs du formulaire
    document.getElementById("ingredient-quantity").value = '';
    document.getElementById("ingredient-unit").value = '';
    document.getElementById("ingredient-name").value = '';

    // Afficher les ingrédients ajoutés
    displayCurrentIngredients();
});

// Ajouter des instructions
document.getElementById("addInstruction").addEventListener("click", function() {
    const instruction = document.getElementById("instruction").value;

    // Validation des champs d'instructions
    if (instruction.trim() === "") {
        alert("Veuillez entrer une étape.");
        return;
    }

    // Si aucune recette actuelle n'est sélectionnée, créer une nouvelle recette
    if (!currentRecipe) {
        currentRecipe = new Recipe("Nouvelle Recette"); // Créer une nouvelle recette
    }

    // Ajouter l'instruction au tableau
    currentRecipe.steps.push(instruction);

    // Réinitialiser le champ d'instruction
    document.getElementById("instruction").value = '';

    // Afficher les étapes ajoutées
    displayCurrentSteps();
});

// Créer une nouvelle recette
document.getElementById("createRecipe").addEventListener("click", function() {
    const title = document.getElementById("newTitle").value;

    if (title.trim() === "") {
        alert("Veuillez entrer un titre pour la recette."); // Alerte si le titre est vide
        return; // Ne pas créer de recette si le titre est vide
    }

    // Ajouter la recette actuelle au tableau des recettes si elle a des ingrédients
    if (currentRecipe && (currentRecipe.ingredients.length > 0 || currentRecipe.steps.length > 0)) {
        currentRecipe.title = title; // Mettre à jour le titre de la recette
        allRecipes.push(currentRecipe); // Ajouter la recette à la liste des recettes
    } else {
        alert("Veuillez ajouter des ingrédients ou des étapes avant de créer la recette.");
        return;
    }

    // Afficher toutes les recettes
    displayAllRecipes();

    // Réinitialiser les champs de saisie
    document.getElementById("newTitle").value = '';
    currentRecipe = null; // Réinitialiser la recette actuelle
});

// Fonction pour afficher toutes les recettes
function displayAllRecipes() {
    let recipesHtml = ""; // Chaîne pour stocker le HTML des recettes

    // Afficher toutes les recettes par défaut
    defaultRecipes.forEach(recipe => {
        recipesHtml += recipe.cook();
    });

    // Afficher toutes les recettes créées
    allRecipes.forEach(recipe => {
        recipesHtml += recipe.cook();
    });

    // Afficher la recette actuelle si elle existe
    if (currentRecipe) {
        recipesHtml += currentRecipe.cook();
    }

    document.getElementById("recipe").innerHTML = recipesHtml; // Mettre à jour le contenu
}

// Attacher l'événement au bouton "Afficher Recette"
document.getElementById("showRecipe").addEventListener("click", function() {
    displayAllRecipes(); // Afficher toutes les recettes, y compris la recette actuelle
});

// Fonction pour afficher les ingrédients en cours
function displayCurrentIngredients() {
    const currentIngredientsDiv = document.getElementById("current-ingredients");
    currentIngredientsDiv.innerHTML = ""; // Réinitialiser le contenu

    if (currentRecipe && currentRecipe.ingredients.length > 0) {
        currentRecipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement("li");
            listItem.textContent = ingredient[0] + " " + ingredient[1] + " de " + ingredient[2] + " (" + ingredient[3] + ")";
            currentIngredientsDiv.appendChild(listItem); // Ajouter l'élément à la liste
        });
    }
}

// Fonction pour afficher les étapes en cours
function displayCurrentSteps() {
    const currentStepsDiv = document.getElementById("current-steps");
    currentStepsDiv.innerHTML = ""; // Réinitialiser le contenu

    if (currentRecipe && currentRecipe.steps.length > 0) {
        currentRecipe.steps.forEach(step => {
            const listItem = document.createElement("li");
            listItem.textContent = step;
            currentStepsDiv.appendChild(listItem); // Ajouter l'élément à la liste
        });
    }
}

// Afficher la recette par défaut au chargement
document.addEventListener("DOMContentLoaded", function() {
    displayAllRecipes(); // Afficher toutes les recettes au chargement
});
