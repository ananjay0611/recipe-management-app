import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext.jsx";
import Recipecard from "../components/Recipecard.jsx";

export default function Favorites() {
  const { recipes } = useRecipes();
  const favs = recipes.filter((r) => r.favorite);

  return (
    <section className="section">
      <h2>Your favorites</h2>
      {favs.length ? (
        <div className="grid">{favs.map((r) => <Recipecard key={r.id} recipe={r} />)}</div>
      ) : (
        <p className="empty">Nothing saved yet. Tap the heart on a recipe to keep it here, or <Link to="/">explore recipes</Link>.</p>
      )}
    </section>
  );
}
