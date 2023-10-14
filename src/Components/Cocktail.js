import { useState, useEffect } from "react";

function Cocktail({ query }) {
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        let apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

        if (query) {
            apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.drinks && data.drinks.length > 0) {
                    setCocktail(data.drinks[0]);
                } else {
                    setCocktail(null); 
                }
            })
            .catch(e => console.error('Error fetching cocktails: ', e));
    }, [query]);  

    // Function to gather ingredients and their measures
    const getIngredients = (cocktail) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) { 
            if (cocktail[`strIngredient${i}`] && cocktail[`strMeasure${i}`]) {
                ingredients.push(`${cocktail[`strMeasure${i}`]} ${cocktail[`strIngredient${i}`]}`);
            } else if (cocktail[`strIngredient${i}`]) {
                ingredients.push(cocktail[`strIngredient${i}`]);
            }
        }
        return ingredients;
    }

    return (
        <div> 
            {cocktail && (
                <div>
                    <h1>{cocktail.strDrink}</h1>
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                    <p>{cocktail.strInstructions}</p>
                    <h3>Ingredients:</h3>
                    <ul>
                        {getIngredients(cocktail).map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Cocktail;