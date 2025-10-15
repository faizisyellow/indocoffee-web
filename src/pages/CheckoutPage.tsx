import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as yup from "yup";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckoutStepper from "../components/CheckoutStepper";
import { useNavigate } from "react-router";

const mockCartItems = [
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

const addressSchema = yup.object({
  name: yup.string().required("Name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  alternativeNumber: yup.string(),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
});

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [reviewData, setReviewData] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      alternativeNumber: "",
      street: "",
      city: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await addressSchema.validate(value, { abortEarly: false });

        const payload = {
          cart_ids: mockCartItems.map((item) => item.id),
          customer_name: value.name,
          customer_email: "user@test.com",
          phone_number: value.phoneNumber,
          alternative_phone_number: value.alternativeNumber || null,
          city: value.city,
          street: value.street,
        };

        console.log("✅ Ready to send payload:", payload);

        setReviewData({
          address: value,
          payload,
        });

        setActiveStep(2);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log("Validation errors:", error.errors);
        }
      }
    },
  });

  const handleProceedToAddress = () => setActiveStep(1);
  const handleBackToCart = () => setActiveStep(0);
  const handleBackToAddress = () => setActiveStep(1);

  const handlePlaceOrder = () => {
    setConfirmOpen(false);
    console.log("🟢 Mock place order submitted with:", reviewData?.payload);
    navigate("/order/2135153sads");
  };

  const total = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 200;
  const grandTotal = total + shipping;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CheckoutStepper activeStep={activeStep} />

      {activeStep === 0 && (
        <>
          <Box sx={{ mb: 4 }}>
            {mockCartItems.map((item, index) => (
              <Box key={index}>
                <Box sx={{ display: "flex", gap: 3, py: 3 }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 150,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                      sx={{ color: "text.secondary" }}
                    >
                      {item.details}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Total: ${total}
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleProceedToAddress}
              >
                SET ADDRESS
              </Button>
            </Box>
          </Box>
        </>
      )}

      {activeStep === 1 && (
        <Box sx={{ bgcolor: "#e0e0e0", p: 4, borderRadius: 1 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <Grid container spacing={3}>
              {Object.entries({
                name: "Name",
                phoneNumber: "Phone Number",
                alternativeNumber: "Alternative Number",
                street: "Street",
                city: "City",
              }).map(([fieldName, label]) => (
                <Grid size={{ xs: 12, md: 6 }} key={fieldName}>
                  <form.Field
                    name={fieldName as any}
                    children={(field) => (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ mb: 1, fontWeight: 600 }}
                        >
                          {label}
                        </Typography>
                        <TextField
                          fullWidth
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          sx={{ bgcolor: "#fff" }}
                        />
                      </Box>
                    )}
                  />
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button variant="outlined" onClick={handleBackToCart}>
                Back to Cart
              </Button>
              <Button type="submit" variant="contained" size="large">
                Review Order
              </Button>
            </Box>
          </form>
        </Box>
      )}

      {activeStep === 2 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            {mockCartItems.map((item, index) => (
              <Box key={index}>
                <Box sx={{ display: "flex", gap: 3, py: 3 }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 150,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                      sx={{ color: "text.secondary" }}
                    >
                      {item.details}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {item.quantity}x
                    </Typography>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, bgcolor: "#e0e0e0", borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <b>ID:</b> 2135153sads
              </Typography>
              <Typography variant="body2">
                <b>Email:</b> user@test.com
              </Typography>
              <Typography variant="body2">
                <b>Name:</b> {reviewData?.address.name}
              </Typography>
              <Typography variant="body2">
                <b>Address:</b> {reviewData?.address.city},{" "}
                {reviewData?.address.street}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <b>Status:</b> In process
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">Total: ${grandTotal}</Typography>
              <Typography variant="body2">Subtotal: ${total}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Shipping: ${shipping}
              </Typography>

              <Typography variant="caption" sx={{ display: "block", mb: 2 }}>
                * You can cancel before order is being roasted.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => setConfirmOpen(true)}
                >
                  PLACE ORDER
                </Button>
                <Button variant="outlined" onClick={handleBackToAddress}>
                  Back
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to place this order? You can’t edit it after
            confirmation.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePlaceOrder}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
