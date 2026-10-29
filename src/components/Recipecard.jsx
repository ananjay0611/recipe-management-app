import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext.jsx";

export default function Recipecard({ recipe }) {
  const { toggleFavorite } = useRecipes();
  const [broken, setBroken] = useState(false);

  return (
    <article className="card">
      <div className="card__media">
        {recipe.image && !broken ? (
          <img src={recipe.image} alt={recipe.title} loading="lazy" onError={() => setBroken(true)} />
        ) : (
          <div className="card__placeholder" aria-hidden="true">🍽️</div>
        )}
        <span className="chip">{recipe.category}</span>
        <button
          className={`heart ${recipe.favorite ? "heart--on" : ""}`}
          onClick={() => toggleFavorite(recipe.id)}
          aria-label={recipe.favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={recipe.favorite}
        >
          ♥
        </button>
      </div>
      <div className="card__body">
        <p className="card__meta">{recipe.time} min</p>
        <h3><Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link></h3>
        <p className="card__desc">{recipe.description}</p>
      </div>
    </article>
  );
}
