import { RecipeCard } from "./RecipeCard";
import { fetchRecipes } from "@/lib/api";
import { mergeRecipesData } from "@/lib/recipeUtils";
import type { Recipe } from "@/lib/types";

export default async function RecetionsGrid() {
  // Fetch recipes from API
  let apiRecipes;
  try {
    apiRecipes = await fetchRecipes();
  } catch (error) {
    console.error("Error loading recipes:", error);
    return (
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-red-600">
            <p>Error loading recipes. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Merge data from API with metadata from local JSON
  const recipes: Recipe[] = mergeRecipesData(apiRecipes);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}