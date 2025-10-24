import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  capitalize,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ChevronLeft, Droplet, Bean, Coffee } from "lucide-react";
import { useNavigate } from "react-router";
import { AuthenticationService } from "../service/authentication";
import { client, clientWithAuth } from "../service/axios";
import { useAlert } from "../hooks/useAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "../service/inventory";
import { useParams } from "react-router";
import { CartsService } from "../service/carts";
import { prettyErrorServer } from "../utils/prettyErrorServer";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const authService = new AuthenticationService(client);
  const getProductService = new InventoryService(client);
  const cartService = new CartsService(clientWithAuth);
  const alert = useAlert();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return getProductService.GetProduct(Number(id!));
    },
  });

  const errorServer = prettyErrorServer(error, {
    429: " Too many requests — you’ve reached the rate limit. Please wait a few moments before trying again.",
  });

  const addCartMutation = useMutation({
    mutationFn: () => {
      return cartService.AddCart(Number(id!));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      alert.success("Product added to cart successfully");
    },
    onError: (error) => {
      const errorMessage = prettyErrorServer(error, {
        409: "This product is already in your cart. You can adjust the quantity there.",
      });
      alert.error(
        errorMessage || "Failed to add product to cart. Please try again.",
      );
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
    addCartMutation.mutate();
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError && errorServer) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{errorServer}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Product not found.</Alert>
      </Container>
    );
  }

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
          gap: 6,
        }}
      >
        <Box
          component="img"
          src={product.image ?? ""}
          alt={product.bean?.name ?? "Product"}
          sx={{
            width: { xs: "100%", md: 450 },
            height: 500,
            objectPosition: "center -80px",
            objectFit: "cover",
          }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {capitalize(String(product.bean?.name ?? ""))}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 3, color: "primary.main" }}
          >
            ${product.price?.toFixed(2) ?? "0.00"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Type:</strong>{" "}
              {capitalize(String(product.form?.name ?? ""))}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Roast:</strong>{" "}
              {capitalize(String(product.roasted ?? ""))}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
            >
              <strong>Available:</strong>
              {(product.quantity ?? 0) === 0 ? (
                <Box
                  component="span"
                  sx={{
                    bgcolor: "#d32f2f",
                    color: "#fff",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  SOLD OUT
                </Box>
              ) : (
                (product.quantity ?? 0)
              )}
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
            size="small"
            onClick={handleAddToCart}
            disabled={
              addCartMutation.isPending || (product.quantity ?? 0) === 0
            }
            sx={{
              py: 1,
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            {addCartMutation.isPending
              ? "ADDING..."
              : (product.quantity ?? 0) === 0
                ? "OUT OF STOCK"
                : "ADD TO CART"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
