import { useState } from "react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Healthy", "Dessert", "Snack"];
const lines = (t) => t.split("\n").map((s) => s.trim()).filter(Boolean);

export default function RecipeForm({ initial, onSubmit, submitLabel = "Save recipe" }) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    category: initial?.category ?? "Dinner",
    time: initial?.time ?? 30,
    image: initial?.image ?? "",
    description: initial?.description ?? "",
    ingredients: initial?.ingredients?.join("\n") ?? "",
    steps: initial?.steps?.join("\n") ?? "",
  });
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handle = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Give your recipe a title.");
    if (!lines(form.ingredients).length) return setError("Add at least one ingredient.");
    setError("");
    onSubmit({
      ...form,
      title: form.title.trim(),
      time: Number(form.time) || 0,
      ingredients: lines(form.ingredients),
      steps: lines(form.steps),
    });
  };

  return (
    <form className="form" onSubmit={handle} noValidate>
      <label>Title
        <input value={form.title} onChange={set("title")} placeholder="e.g. Creamy Tomato Pasta" />
      </label>
      <div className="form__row">
        <label>Category
          <select value={form.category} onChange={set("category")}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Cooking time (minutes)
          <input type="number" min="1" value={form.time} onChange={set("time")} />
        </label>
      </div>
      <label>Image link
        <input type="url" value={form.image} onChange={set("image")} placeholder="https://…" />
      </label>
      <label>Short description
        <textarea rows="2" value={form.description} onChange={set("description")} />
      </label>
      <label>Ingredients (one per line)
        <textarea rows="5" value={form.ingredients} onChange={set("ingredients")} />
      </label>
      <label>Steps (one per line)
        <textarea rows="5" value={form.steps} onChange={set("steps")} />
      </label>
      {error && <p className="form__error" role="alert">{error}</p>}
      <button className="btn btn--primary" type="submit">{submitLabel}</button>
    </form>
  );
}
