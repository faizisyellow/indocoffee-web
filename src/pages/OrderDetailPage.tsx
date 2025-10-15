import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const mockOrderItems = [
  {
    id: 1,
    name: "ARABICA",
    price: 150,
    details: "WHOLE COFFEE BEANS | SIZE | 200G | ROAST | LIGHT",
    quantity: 2,
  },
  {
    id: 2,
    name: "ARABICA",
    price: 150,
    details: "WHOLE COFFEE BEANS | SIZE | 200G | ROAST | LIGHT",
    quantity: 1,
  },
];

const mockOrder = {
  id: "2135153sads",
  email: "user@test.com",
  name: "user",
  address: "Somewhere\nDetail address",
  status: "In proccess",
  subtotal: 599,
  shipping: 200,
  total: 799,
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState(mockOrder.status);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    console.log("Cancel order:", id);
    setStatus("Canceled");
    setConfirmOpen(false);
  };

  function handleGoBack() {
    navigate("/account");
  }

  const isCancellable = status === "In proccess";

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        variant="outlined"
        sx={{
          color: "#0b341b",
          borderColor: "#0b341b",
          textTransform: "none",
          fontWeight: 600,
        }}
        onClick={handleGoBack}
      >
        See All Orders
      </Button>

      <Typography
        variant="h4"
        sx={{ fontWeight: 700, my: 6, textAlign: "center" }}
      >
        ORDER DETAIL
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {mockOrderItems.map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  py: 3,
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 150,
                    bgcolor: "#333",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  INDOCOFFEE
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
                  >
                    ${item.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1 }}
                  >
                    {item.details}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, mt: 2 }}>
                    {item.quantity}x
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>

        <Paper
          elevation={0}
          sx={{
            flex: "0 0 auto",
            width: { xs: "100%", lg: 400 },
            bgcolor: "#e0e0e0",
            p: 3,
            height: "fit-content",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="body1">ID</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {mockOrder.id}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="body1">Email</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {mockOrder.email}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="body1">Name</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {mockOrder.name}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="body1">Address</Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, textAlign: "right" }}
              >
                {mockOrder.address.split("\n").map((line, i) => (
                  <Box key={i}>{line}</Box>
                ))}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="body1">Status</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {status}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                ${mockOrder.total}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                pl: 2,
              }}
            >
              <Typography variant="body2">Sub total</Typography>
              <Typography variant="body2">${mockOrder.subtotal}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pl: 2,
              }}
            >
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2">${mockOrder.shipping}</Typography>
            </Box>
          </Box>

          {isCancellable ? (
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="body2"
                sx={{ mb: 2, fontSize: "0.875rem", color: "text.disabled" }}
              >
                • you can cancel before order is being roasted
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setConfirmOpen(true)}
                sx={{
                  bgcolor: "#fbc02d",
                  borderColor: "#fbc02d",
                  color: "#000",
                  py: 1.5,
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "#fbc02d",
                    bgcolor: "#f9a825",
                  },
                }}
              >
                CANCEL
              </Button>
            </Box>
          ) : (
            <Box sx={{ mt: 4 }}>
              <Typography variant="body2" sx={{ mb: 2, fontSize: "0.875rem" }}>
                • you can cancel before order is being roasted
              </Typography>
              <Button
                fullWidth
                variant="contained"
                disabled
                sx={{
                  bgcolor: "#fbc02d",
                  color: "#000",
                  py: 1.5,
                  fontWeight: 700,
                }}
              >
                CANCELED
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} variant="outlined">
            No
          </Button>
          <Button onClick={handleCancel} variant="contained" color="warning">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
