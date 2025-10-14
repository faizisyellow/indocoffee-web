import {
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router";

const mockProducts = [
  {
    id: 1,
    name: "ARABICA",
    price: 150,
    image: "/coffee-arabica.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
  },
  {
    id: 2,
    name: "ROBUSTA",
    price: 120,
    image: "/coffee-robusta.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "DARK",
  },
  {
    id: 3,
    name: "LIBERICA",
    price: 180,
    image: "/coffee-liberica.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "MEDIUM",
  },
  {
    id: 4,
    name: "EXCELSA",
    price: 160,
    image: "/coffee-excelsa.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    console.log("Navigate to product:", productId);
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Add to cart:", productId);
  };

  const handleLogin = () => {
    console.log("Navigate to login");
    navigate("/login");
  };

  const handleRegister = () => {
    console.log("Navigate to register");
    navigate("/register");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mb: 4,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleLogin}
          sx={{
            color: "#000",
            borderColor: "#000",
            "&:hover": {
              borderColor: "#000",
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          LOGIN
        </Button>
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{
            bgcolor: "#000",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          REGISTER
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
              onClick={() => handleProductClick(product.id)}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 280,
                  bgcolor: "#333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                INDOCOFFEE
              </Box>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
                >
                  ${product.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                >
                  {product.type}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                >
                  SIZE | {product.size}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                >
                  ROAST | {product.roast}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={(e) => handleAddToCart(product.id, e)}
                  sx={{
                    bgcolor: "#2e7d32",
                    "&:hover": {
                      bgcolor: "#1b5e20",
                    },
                  }}
                >
                  ADD TO CART
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
