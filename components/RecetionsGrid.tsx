import Image from "next/image";
import Link from "next/link";
import recipesData from "@/data/recipes.json";
import type { Recipe } from "@/lib/types";
import { RecipeCard } from "./RecipeCard";

const recipes = recipesData as Recipe[];


export default function RecetionsGrid() {
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