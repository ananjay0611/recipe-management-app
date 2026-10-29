import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext.jsx";
import RecipeForm from "../components/RecipeForm.jsx";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipe, updateRecipe, deleteRecipe, toggleFavorite } = useRecipes();
  const [editing, setEditing] = useState(false);
  const recipe = getRecipe(id);

  if (!recipe) {
    return <p className="empty">Recipe not found. <Link to="/">Back to recipes</Link></p>;
  }

  if (editing) {
    return (
      <section className="section section--narrow">
        <h2>Edit recipe</h2>
        <RecipeForm
          initial={recipe}
          submitLabel="Save changes"
          onSubmit={(data) => { updateRecipe(id, data); setEditing(false); }}
        />
      </section>
    );
  }

  const remove = () => {
    if (window.confirm(`Delete "${recipe.title}"?`)) {
      deleteRecipe(id);
      navigate("/");
    }
  };

  return (
    <article className="section section--narrow detail">
      <Link to="/" className="back">← All recipes</Link>
      {recipe.image && (
        <img className="detail__img" src={recipe.image} alt={recipe.title} onError={(e) => (e.currentTarget.style.display = "none")} />
      )}
      <p className="card__meta">{recipe.category} · {recipe.time} min</p>
      <h1>{recipe.title}</h1>
      <p className="hero__lead">{recipe.description}</p>
      <div className="detail__actions">
        <button className="btn btn--ghost" onClick={() => toggleFavorite(id)}>
          {recipe.favorite ? "♥ Saved" : "♡ Save to favorites"}
        </button>
        <button className="btn btn--ghost" onClick={() => setEditing(true)}>Edit</button>
        <button className="btn btn--danger" onClick={remove}>Delete</button>
      </div>
      <div className="detail__cols">
        <div>
          <h3>Ingredients</h3>
          <ul>{recipe.ingredients.map((i, n) => <li key={n}>{i}</li>)}</ul>
        </div>
        <div>
          <h3>Method</h3>
          <ol>{recipe.steps.map((s, n) => <li key={n}>{s}</li>)}</ol>
        </div>
      </div>
    </article>
  );
}
