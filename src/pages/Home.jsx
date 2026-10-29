import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext.jsx";
import Recipecard from "../components/Recipecard.jsx";

export default function Home() {
  const { recipes } = useRecipes();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(recipes.map((r) => r.category))], [recipes]);
  const shown = recipes.filter(
    (r) =>
      (category === "All" || r.category === category) &&
      (r.title + r.description).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <p className="hero__kicker">Your little kitchen companion</p>
          <h1>
            <span className="ink">Good food.</span>
            <span className="accent">Good mood.</span>
          </h1>
          <p className="hero__lead">
            Keep your favorite recipes close, discover your next meal and make every day a little more delicious.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary" onClick={() => document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" })}>
              Browse recipes
            </button>
            <Link to="/add" className="btn btn--ghost">Add your own</Link>
          </div>
        </div>
        <div className="hero__plate">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
            alt="A colourful salad bowl"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </section>

      <section id="recipes" className="section">
        <div className="toolbar">
          <h2>All recipes</h2>
          <input
            type="search"
            placeholder="Search recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search recipes"
          />
        </div>
        <div className="filters">
          {categories.map((c) => (
            <button key={c} className={`pill ${c === category ? "pill--on" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        {shown.length ? (
          <div className="grid">{shown.map((r) => <Recipecard key={r.id} recipe={r} />)}</div>
        ) : (
          <p className="empty">No recipes match. Try another search or <Link to="/add">add a recipe</Link>.</p>
        )}
      </section>
    </>
  );
}
