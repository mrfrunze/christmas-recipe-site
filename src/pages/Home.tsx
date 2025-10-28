// src/pages/Home.tsx
import { Box, Container, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";

interface Recipe {
  id: number;
  title: string;
  image: string;
}

// Mockade julrecept
const mockRecipes: Recipe[] = [
  { id: 1, title: "Pepparkakor", image: "https://picsum.photos/seed/pepparkakor/400/300" },
  { id: 2, title: "Lussekatter", image: "https://picsum.photos/seed/lussekatter/400/300" },
  { id: 3, title: "Knäck", image: "https://picsum.photos/seed/knack/400/300" },
  { id: 4, title: "Julgodis", image: "https://picsum.photos/seed/julgodis/400/300" },
  { id: 5, title: "Chokladtryfflar", image: "https://picsum.photos/seed/tryfflar/400/300" },
  { id: 6, title: "Saffransbiscotti", image: "https://picsum.photos/seed/biscotti/400/300" },
];

export default function Home() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          backgroundColor: "#d32f2f",
          height: "16vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", textAlign: "center" }}>
          Julens söta favoriter
        </Typography>
      </Box>

      {/* Sökfält */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 4 }}>
        <SearchBar />
      </Container>

      {/* Receptkort */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2, // mellanrum mellan korten
          px: { xs: 2, sm: 4, md: 6 }, // matchar Headerns padding
        }}
      >
        {mockRecipes.map((recipe) => (
          <Box
            key={recipe.id}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 48%", md: "1 1 30%" },
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                overflow: "hidden",
                textAlign: "center",
                boxShadow: 2,
                backgroundColor: "white",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />
              <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
                {recipe.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
