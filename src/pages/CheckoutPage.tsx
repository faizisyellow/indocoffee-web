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
        console.log("Address form submitted:", value);
        navigate("/order/2135153sads");
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log("Validation errors:", error.errors);
        }
      }
    },
  });

  const handleProceedToAddress = () => {
    console.log("Proceed to address step");
    setActiveStep(1);
  };

  const total = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CheckoutStepper activeStep={activeStep} />

      {activeStep === 0 && (
        <>
          <Box sx={{ mb: 4 }}>
            {mockCartItems.map((item, index) => (
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
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 3,
            }}
          >
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
        <Box
          sx={{
            bgcolor: "#e0e0e0",
            p: 4,
            borderRadius: 1,
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <form.Field
                  name="name"
                  children={(field) => (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        Name
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

              <Grid size={{ xs: 12, md: 6 }}>
                <form.Field
                  name="phoneNumber"
                  children={(field) => (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        Phone Number
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

              <Grid size={{ xs: 12, md: 6 }}>
                <form.Field
                  name="alternativeNumber"
                  children={(field) => (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        Alternatif number
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

              <Grid size={{ xs: 12, md: 6 }}>
                <form.Field
                  name="street"
                  children={(field) => (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        Street
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

              <Grid size={{ xs: 12, md: 6 }}>
                <form.Field
                  name="city"
                  children={(field) => (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        City
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
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 4,
              }}
            >
              <Button type="submit" variant="contained" size="large">
                Review Order
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Container>
  );
}
