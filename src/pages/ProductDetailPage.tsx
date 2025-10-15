import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { ChevronLeft, Plus, Minus, Droplet, Bean, Coffee } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const mockProduct = {
  id: 1,
  name: "ARABICA",
  price: 150,
  image: "/coffee-arabica.jpg",
  type: "WHOLE COFFEE BEANS",
  size: "200G",
  roast: "LIGHT",
  description:
    "Premium Arabica coffee beans sourced from the finest Indonesian plantations. Known for its smooth, mild flavor with subtle notes of chocolate and fruit.",
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleBack = () => {
    console.log("Navigate back to home");
    navigate("/");
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", { productId: id, quantity });
  };

  const handleIncrement = () => {
    console.log("Increment quantity");
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    console.log("Decrement quantity");
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mb: 2 }}>
          <ChevronLeft size={24} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: "0 0 auto",
            width: { xs: "100%", md: 400 },
            height: 500,
            bgcolor: "#333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          INDOCOFFEE
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {mockProduct.name}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 3, color: "primary.main" }}
          >
            ${mockProduct.price}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Type:</strong> {mockProduct.type}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Size:</strong> {mockProduct.size}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Roast:</strong> {mockProduct.roast}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Quantity:
            </Typography>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
              }}
              elevation={0}
            >
              <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
                <Minus size={18} />
              </IconButton>
              <Typography
                sx={{
                  px: 3,
                  fontWeight: 600,
                  minWidth: 40,
                  textAlign: "center",
                }}
              >
                {quantity}
              </Typography>
              <IconButton onClick={handleIncrement}>
                <Plus size={18} />
              </IconButton>
            </Paper>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Keep in Mind
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    border: "2px solid #000",
                    borderRadius: 1,
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Droplet size={24} />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Keep Dry
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    border: "2px solid #000",
                    borderRadius: 1,
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bean size={24} />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Origin
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    border: "2px solid #000",
                    borderRadius: 1,
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Coffee size={24} />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Roaster
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Total:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ${mockProduct.price * quantity}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleAddToCart}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            ADD TO CART
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
