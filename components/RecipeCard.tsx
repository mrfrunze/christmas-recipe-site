import Image from "next/image";
import { Recipe } from "../lib/types";

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <article className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative w-full h-56 overflow-hidden">
        <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
      </div>

      <div className="p-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg">{recipe.title}</h3>
        <span className="text-sm text-gray-600">{recipe.timeInMins} min</span>
      </div>
    </article>
  );
};
