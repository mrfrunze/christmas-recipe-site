import Image from "next/image";
import { Recipe } from "../lib/types";
import { CiClock2 } from "react-icons/ci";
import { PiCookingPotFill, PiCookingPotDuotone, PiCookingPot  } from "react-icons/pi";



type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <article className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative w-full h-56 overflow-hidden">
        <Image src={recipe.imageUrl} alt={recipe.title} fill className="object-cover" />
      </div>

      <div className="py-2 px-1 flex flex-col justify-between">
        <h3 className="text-[16px] text-center">{recipe.title}</h3>
        <div className="flex items-center justify-center text-sm text-gray-600 h-8 gap-2 bg-[#f5faf4]">
          <CiClock2/>
          <span>Under</span>
          <span>{recipe.timeInMins} min</span>
          <PiCookingPot/>
          <span>Medel</span>
        </div>
      </div>
    </article>
  );
};
