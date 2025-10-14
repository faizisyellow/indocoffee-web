import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const mockCartItems = [
  {
    id: 1,
    name: "ARABICA",
    price: 150,
    image: "/coffee-placeholder.jpg",
    details: "WHOLE COFFEE BEANS | SIZE | 200G | ROAST | LIGHT",
    quantity: 2,
  },
  {
    id: 2,
    name: "ROBUSTA",
    price: 120,
    image: "/coffee-placeholder.jpg",
    details: "WHOLE COFFEE BEANS | SIZE | 200G | ROAST | DARK",
    quantity: 1,
  },
];

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("Proceed to checkout");
    onClose();
    navigate("/checkout");
  };

  const handleRemoveItem = (itemId: number) => {
    console.log("Remove item from cart:", itemId);
  };

  const subtotal = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 400 },
            bgcolor: "#f5f5f5",
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
          {mockCartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 100,
                    bgcolor: "#333",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "0.75rem",
                  }}
                >
                  INDOCOFFEE
                </Box>
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
                      {item.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    ${item.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.75rem", color: "text.secondary", mb: 1 }}
                  >
                    {item.details}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Qty: {item.quantity}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
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
              ${subtotal}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleCheckout}
          >
            CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
