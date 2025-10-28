import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardMedia component="img" height="200" image={recipe.image} alt={recipe.title} />
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>
      </CardContent>
    </Card>
  );
}
