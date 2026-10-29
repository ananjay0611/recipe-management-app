import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext.jsx";
import RecipeForm from "../components/RecipeForm.jsx";

export default function AddRecipe() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  return (
    <section className="section section--narrow">
      <h2>Add a recipe</h2>
      <RecipeForm submitLabel="Save recipe" onSubmit={(data) => navigate(`/recipe/${addRecipe(data)}`)} />
    </section>
  );
}
