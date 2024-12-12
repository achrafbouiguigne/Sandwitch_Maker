document.addEventListener('DOMContentLoaded', function() {
    const ingredients = document.querySelectorAll('.ingredient');
    const ingredientsList = document.getElementById('ingredients-list');
    const sandwichLayers = document.querySelector('.sandwich-layers');
    const resetButton = document.getElementById('reset-sandwich');

    let selectedIngredients = {
        bread: null,
        protein: null,
        veggie: [],
        cheese: null
    };

    function updateSandwichPreview() {
        sandwichLayers.innerHTML = '';
        
        // Add top bread
        if (selectedIngredients.bread) {
            addLayer('bread-top', selectedIngredients.bread);
        }

        // Add cheese
        if (selectedIngredients.cheese) {
            addLayer('cheese', selectedIngredients.cheese);
        }

        // Add vegetables
        selectedIngredients.veggie.forEach(veggie => {
            addLayer('veggie', veggie);
        });

        // Add protein
        if (selectedIngredients.protein) {
            addLayer('protein', selectedIngredients.protein);
        }

        // Add bottom bread
        if (selectedIngredients.bread) {
            addLayer('bread-bottom', selectedIngredients.bread);
        }
    }

    function addLayer(type, name) {
        const layer = document.createElement('div');
        layer.className = `layer ${type}`;
        layer.style.backgroundColor = getIngredientColor(type, name);
        sandwichLayers.appendChild(layer);
    }

    function getIngredientColor(type, name) {
        const colors = {
            'bread-top': '#d4a373',
            'bread-bottom': '#d4a373',
            'cheese': '#ffd700',
            'protein': '#bc6c25',
            'veggie': '#606c38'
        };
        return colors[type] || '#ddd';
    }

    function updateIngredientsList() {
        ingredientsList.innerHTML = '';
        
        if (selectedIngredients.bread) {
            addIngredientToList(selectedIngredients.bread + ' Bread');
        }
        if (selectedIngredients.protein) {
            addIngredientToList(selectedIngredients.protein);
        }
        selectedIngredients.veggie.forEach(veggie => {
            addIngredientToList(veggie);
        });
        if (selectedIngredients.cheese) {
            addIngredientToList(selectedIngredients.cheese + ' Cheese');
        }
    }

    function addIngredientToList(ingredient) {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    }

    ingredients.forEach(ingredient => {
        ingredient.addEventListener('click', function() {
            const type = this.dataset.type;
            const name = this.dataset.name;

            // Handle selection based on ingredient type
            if (type === 'veggie') {
                // Toggle vegetable selection
                const index = selectedIngredients.veggie.indexOf(name);
                if (index === -1) {
                    selectedIngredients.veggie.push(name);
                    this.classList.add('selected');
                } else {
                    selectedIngredients.veggie.splice(index, 1);
                    this.classList.remove('selected');
                }
            } else {
                // Single selection for other types
                const typeIngredients = document.querySelectorAll(`.ingredient[data-type="${type}"]`);
                typeIngredients.forEach(ing => ing.classList.remove('selected'));
                
                if (selectedIngredients[type] === name) {
                    selectedIngredients[type] = null;
                } else {
                    selectedIngredients[type] = name;
                    this.classList.add('selected');
                }
            }

            updateSandwichPreview();
            updateIngredientsList();
        });
    });

    resetButton.addEventListener('click', function() {
        // Reset selections
        selectedIngredients = {
            bread: null,
            protein: null,
            veggie: [],
            cheese: null
        };

        // Remove selected class from all ingredients
        ingredients.forEach(ingredient => {
            ingredient.classList.remove('selected');
        });

        // Update display
        updateSandwichPreview();
        updateIngredientsList();
    });
});
