import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  capitalize,
} from "@mui/material";
import { ChevronLeft, Droplet, Bean, Coffee } from "lucide-react";
import { useNavigate } from "react-router";
import { AuthenticationService } from "../service/authentication";
import { client } from "../service/axios";
import { useAlert } from "../hooks/useAlert";
import { useQuery } from "@tanstack/react-query";
import { InventoryService } from "../service/inventory";
import { useParams } from "react-router";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const authService = new AuthenticationService(client);
  const getProductService = new InventoryService(client);
  const alert = useAlert();
  const { id } = useParams();

  const product = useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return getProductService.GetProduct(Number(id!));
    },
  });

  const handleBack = () => {
    navigate("/");
  };

  const handleAddToCart = () => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }
    alert.success("Success add product");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
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
            {capitalize(String(product.data?.bean.name ?? ""))}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 3, color: "primary.main" }}
          >
            ${product.data?.price}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Type:</strong>{" "}
              {capitalize(String(product.data?.form.name ?? ""))}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Roast:</strong>{" "}
              {capitalize(String(product.data?.roasted ?? ""))}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Available:</strong> {product.data?.quantity}
            </Typography>
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
