import { createContext, useContext, useEffect, useState } from "react";

const RecipeContext = createContext(null);
const KEY = "recipebook:recipes";

const seed = [
  {
    id: "r1",
    title: "Creamy Tomato Pasta",
    category: "Dinner",
    time: 25,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&q=80",
    description: "A comforting pasta tossed in a silky tomato and basil sauce with fresh basil.",
    ingredients: ["250 g farfalle pasta", "2 cups crushed tomatoes", "1/2 cup cream", "3 garlic cloves", "Fresh basil", "Salt and pepper"],
    steps: ["Boil the pasta until al dente.", "Sauté garlic in olive oil, add tomatoes and simmer for 10 minutes.", "Stir in the cream and basil.", "Toss the pasta in the sauce and serve hot."],
    favorite: false,
  },
  {
    id: "r2",
    title: "Rainbow Buddha Bowl",
    category: "Healthy",
    time: 20,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80",
    description: "A colourful nourishing bowl with greens, crunchy vegetables and chickpeas with zesty dressing.",
    ingredients: ["1 cup cooked quinoa", "1 cup chickpeas", "1 avocado", "Cherry tomatoes", "Red cabbage", "Lemon-tahini dressing"],
    steps: ["Roast the chickpeas until crisp.", "Arrange quinoa, vegetables and avocado in a bowl.", "Drizzle with the dressing and serve."],
    favorite: true,
  },
  {
    id: "r3",
    title: "Fluffy Banana Pancakes",
    category: "Breakfast",
    time: 15,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80",
    description: "Soft, golden pancakes sweetened with ripe bananas.",
    ingredients: ["2 ripe bananas", "1 cup flour", "1 egg", "3/4 cup milk", "1 tsp baking powder", "Honey to serve"],
    steps: ["Mash the bananas and whisk in egg and milk.", "Fold in flour and baking powder.", "Cook spoonfuls on a buttered pan until golden on both sides."],
    favorite: false,
  },
];

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      return saved ? JSON.parse(saved) : seed;
    } catch {
      return seed;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(recipes));
    } catch {
      /* storage unavailable */
    }
  }, [recipes]);

  const addRecipe = (data) => {
    const recipe = { ...data, id: crypto.randomUUID(), favorite: false };
    setRecipes((r) => [recipe, ...r]);
    return recipe.id;
  };
  const updateRecipe = (id, data) => setRecipes((r) => r.map((x) => (x.id === id ? { ...x, ...data } : x)));
  const deleteRecipe = (id) => setRecipes((r) => r.filter((x) => x.id !== id));
  const toggleFavorite = (id) => setRecipes((r) => r.map((x) => (x.id === id ? { ...x, favorite: !x.favorite } : x)));
  const getRecipe = (id) => recipes.find((x) => x.id === id);

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite, getRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipeContext);
