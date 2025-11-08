"use client";

import { useMemo } from "react";
import { RecipeCard } from "./RecipeCard";
import { searchRecipes } from "@/lib/searchUtils";
import { useSearch } from "@/contexts/SearchContext";
import type { Recipe } from "@/lib/types";

interface RecipesWithSearchProps {
  recipes: Recipe[];
}

export default function RecipesWithSearch({ recipes }: RecipesWithSearchProps) {
  const { searchTerm } = useSearch();

  // Filter recipes based on search term
  const filteredRecipes = useMemo(() => {
    return searchRecipes(recipes, searchTerm);
  }, [recipes, searchTerm]);

  // If no search term, show all recipes
  const recipesToDisplay = searchTerm ? filteredRecipes : recipes;

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Recipes Grid */}
        {recipesToDisplay.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {recipesToDisplay.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Inga recept hittades för "{searchTerm}". Prova med ett annat sökord.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

