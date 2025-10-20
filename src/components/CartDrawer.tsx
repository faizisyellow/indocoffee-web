import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  CircularProgress,
  Alert,
  capitalize,
} from "@mui/material";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router";
import { ProfileService } from "../service/profile";
import { clientWithAuth } from "../service/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { prettyErrorServer } from "../utils/prettyErrorServer";
import { CartsService } from "../service/carts";
import { useAlert } from "../hooks/useAlert";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const profileService = new ProfileService(clientWithAuth);
  const cartService = new CartsService(clientWithAuth);
  const queryClient = useQueryClient();
  const alert = useAlert();

  const {
    data: getCarts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: () => {
      return profileService.GetUsersCarts();
    },
  });

  const errorServer = prettyErrorServer(error);

  const increaseQuantityMutation = useMutation({
    mutationFn: (cartId: number) => {
      return cartService.IncreaseQuantity(cartId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      const errorMessage = prettyErrorServer(error);
      alert.error(
        errorMessage || "Failed to update quantity. Please try again.",
      );
    },
  });

  const decreaseQuantityMutation = useMutation({
    mutationFn: (cartId: number) => {
      return cartService.DecreaseQuantity(cartId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      const errorMessage = prettyErrorServer(error);
      alert.error(
        errorMessage || "Failed to update quantity. Please try again.",
      );
    },
  });

  const handleCheckout = () => {
    console.log("Proceed to checkout");
    onClose();
    navigate("/checkout");
  };

  const handleRemoveItem = (itemId: number) => {
    console.log("Remove item from cart:", itemId);
  };

  const handleIncrease = (cartId: number) => {
    increaseQuantityMutation.mutate(cartId);
  };

  const handleDecrease = (cartId: number) => {
    decreaseQuantityMutation.mutate(cartId);
  };

  const subtotal =
    getCarts?.carts?.reduce(
      (sum, item) => sum + (item.product?.price ?? 0) * (item.quantity ?? 0),
      0,
    ) ?? 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 400 },
            bgcolor: "#ffffff",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #ccc",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Shopping Cart
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={24} />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : isError && errorServer ? (
            <Alert severity="error">{errorServer}</Alert>
          ) : !getCarts?.carts ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Your cart is empty
              </Typography>
            </Box>
          ) : (
            getCarts.carts.map((item) => (
              <Box key={item.id} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    component="img"
                    src={item.product?.image ?? ""}
                    alt={item.product?.bean?.name ?? "Product"}
                    sx={{
                      width: 80,
                      height: 100,
                      flexShrink: 0,
                      objectFit: "cover",
                      bgcolor: "#f9f9f9",
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {capitalize(String(item.product?.bean?.name ?? ""))}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                      ${item.product?.price?.toFixed(2) ?? "0.00"}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", mb: 1, color: "text.secondary" }}
                    >
                      {`${capitalize(String(item.product?.form?.name ?? ""))} | ${capitalize(String(item.product?.roasted ?? ""))}`}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleDecrease(item.id)}
                        disabled={
                          decreaseQuantityMutation.isPending ||
                          (item.quantity ?? 0) <= 1
                        }
                        sx={{
                          border: "1px solid #ddd",
                          borderRadius: 1,
                          width: 28,
                          height: 28,
                        }}
                      >
                        <Minus size={16} />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          minWidth: 30,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity ?? 0}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleIncrease(item.id)}
                        disabled={increaseQuantityMutation.isPending}
                        sx={{
                          border: "1px solid #ddd",
                          borderRadius: 1,
                          width: 28,
                          height: 28,
                        }}
                      >
                        <Plus size={16} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}
        </Box>

        <Box sx={{ p: 2, bgcolor: "#fff", borderTop: "1px solid #ccc" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Subtotal:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCheckout}
            disabled={!getCarts?.carts || isLoading}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
