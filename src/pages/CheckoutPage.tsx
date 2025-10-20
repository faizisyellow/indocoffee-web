import { useState, useMemo } from "react";
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
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { CartsService } from "../service/carts";
import { ProfileService } from "../service/profile";
import { OrdersService } from "../service/orders";
import { clientWithAuth } from "../service/axios";
import { prettyErrorServer } from "../utils/prettyErrorServer";
import { useAlert } from "../hooks/useAlert";
import CheckoutStepper from "../components/CheckoutStepper";

type AddressFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  alternativeNumber?: string;
  street: string;
  city: string;
};

const addressSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  alternativeNumber: yup.string().nullable(),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
});

const cartService = new CartsService(clientWithAuth);
const profileService = new ProfileService(clientWithAuth);
const ordersService = new OrdersService(clientWithAuth);

export default function CheckoutPage() {
  const navigate = useNavigate();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);
  const [reviewData, setReviewData] = useState<{
    address: AddressFormValues;
    cartIds: number[];
  } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    data: userCarts,
    isLoading: cartsLoading,
    isError: cartsIsError,
    error: cartsErrorObj,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      return await profileService.GetUsersCarts();
    },
  });

  const cartsErrorMessage = prettyErrorServer(cartsErrorObj);

  const increaseMutation = useMutation({
    mutationFn: (cartId: number) => cartService.IncreaseQuantity(cartId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["carts"] }),
    onError: (err) => {
      const msg = prettyErrorServer(err);
      alert.error(msg || "Failed to increase quantity");
    },
  });

  const decreaseMutation = useMutation({
    mutationFn: (cartId: number) => cartService.DecreaseQuantity(cartId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["carts"] }),
    onError: (err) => {
      const msg = prettyErrorServer(err);
      alert.error(msg || "Failed to decrease quantity");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (cartId: number) => cartService.DeleteCart(cartId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["carts"] }),
    onError: (err) => {
      const msg = prettyErrorServer(err);
      alert.error(msg || "Failed to remove item");
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (payload: {
      alternative_phone_number?: string;
      cart_ids: number[];
      city: string;
      customer_email: string;
      customer_name: string;
      phone_number: string;
      street: string;
    }) => {
      return ordersService.CreateOrder(payload, {
        X_Idempotency_Key: uuidv4(),
      });
    },
    onSuccess: () => {
      alert.success("Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      navigate("account");
    },
    onError: (err) => {
      const msg = prettyErrorServer(err);
      alert.error(msg || "Failed to place order");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      alternativeNumber: "",
      street: "",
      city: "",
    } as AddressFormValues,
    onSubmit: async ({ value }) => {
      try {
        await addressSchema.validate(value, { abortEarly: false });

        const cartIds: number[] = userCarts?.carts?.map((c) => c.id) ?? [];

        if (cartIds.length === 0) {
          alert.error("Your cart is empty.");
          return;
        }

        setReviewData({ address: value, cartIds });
        setActiveStep(2);
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          alert.error(err.errors[0] ?? "Invalid input");
        } else {
          alert.error("Failed to validate address");
        }
      }
    },
  });

  const subtotal = useMemo(
    () =>
      userCarts?.carts?.reduce(
        (s, it) => s + (it.product?.price ?? 0) * (it.quantity ?? 0),
        0,
      ) ?? 0,
    [userCarts],
  );

  const handleProceedToAddress = () => setActiveStep(1);
  const handleBackToCart = () => setActiveStep(0);
  const handleBackToAddress = () => setActiveStep(1);

  const handlePlaceOrder = () => {
    if (!reviewData) return;

    const payload = {
      cart_ids: reviewData.cartIds,
      customer_name: reviewData.address.name,
      customer_email: reviewData.address.email,
      phone_number: reviewData.address.phoneNumber,
      alternative_phone_number:
        reviewData.address.alternativeNumber || undefined,
      city: reviewData.address.city,
      street: reviewData.address.street,
    };

    createOrderMutation.mutate(payload);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CheckoutStepper activeStep={activeStep} />

      {/* Step 0 - Cart */}
      {activeStep === 0 && (
        <>
          {cartsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : cartsIsError && cartsErrorMessage ? (
            <Alert severity="error">{cartsErrorMessage}</Alert>
          ) : !userCarts?.carts?.length ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <ShoppingBag size={48} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Your cart is empty
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ mb: 4 }}>
                {userCarts.carts.map((item) => (
                  <Box key={item.id}>
                    <Box sx={{ display: "flex", gap: 3, py: 3 }}>
                      <Box
                        component="img"
                        src={item.product.image}
                        alt={item.product.bean.name}
                        sx={{
                          width: 120,
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 1,
                          bgcolor: "#f9f9f9",
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, mb: 1 }}
                        >
                          {item.product.bean.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
                        >
                          ${item.product.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {item.product.form.name} | {item.product.roasted}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 2,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => decreaseMutation.mutate(item.id)}
                            disabled={
                              decreaseMutation.isPending || item.quantity <= 1
                            }
                            sx={{ border: "1px solid #ddd", borderRadius: 1 }}
                          >
                            <Minus size={16} />
                          </IconButton>

                          <Typography
                            sx={{
                              fontWeight: 600,
                              minWidth: 28,
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() => increaseMutation.mutate(item.id)}
                            disabled={
                              increaseMutation.isPending ||
                              item.quantity >= item.product.stock
                            }
                            sx={{ border: "1px solid #ddd", borderRadius: 1 }}
                          >
                            <Plus size={16} />
                          </IconButton>

                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => deleteMutation.mutate(item.id)}
                            sx={{ ml: 2 }}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Total: ${subtotal.toFixed(2)}
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
        </>
      )}

      {/* Step 1 - Address */}
      {activeStep === 1 && (
        <Box sx={{ bgcolor: "#f5f5f5", p: 4, borderRadius: 1 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <Grid container spacing={3}>
              {(
                [
                  ["name", "Full name"],
                  ["email", "Email"],
                  ["phoneNumber", "Phone number"],
                  ["alternativeNumber", "Alternative number"],
                  ["street", "Street"],
                  ["city", "City"],
                ] as [keyof AddressFormValues, string][]
              ).map(([fieldName, label]) => (
                <Grid size={{ xs: 12, md: 6 }} key={fieldName}>
                  <form.Field
                    name={fieldName}
                    children={(f) => (
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ mb: 1, fontWeight: 600 }}
                        >
                          {label}
                        </Typography>
                        <TextField
                          fullWidth
                          value={f.state.value as string}
                          onChange={(e) => f.handleChange(e.target.value)}
                          onBlur={f.handleBlur}
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

      {/* Step 2 - Review */}
      {activeStep === 2 && reviewData && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            {userCarts?.carts.map((item) => (
              <Box key={item.id}>
                <Box sx={{ display: "flex", gap: 3, py: 3 }}>
                  <Box
                    component="img"
                    src={item.product.image}
                    alt={item.product.bean.name}
                    sx={{
                      width: 120,
                      height: 150,
                      objectFit: "cover",
                      borderRadius: 1,
                      bgcolor: "#f9f9f9",
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      {item.product.bean.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
                    >
                      ${item.product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {item.product.form.name} | {item.product.roasted}
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
            <Paper sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <b>Email:</b> {reviewData.address.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <b>Name:</b> {reviewData.address.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <b>Address:</b> {reviewData.address.street},{" "}
                {reviewData.address.city}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">
                Total: ${subtotal.toFixed(2)}
              </Typography>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => setConfirmOpen(true)}
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? "Placing..." : "PLACE ORDER"}
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
            onClick={handlePlaceOrder}
            variant="contained"
            disabled={createOrderMutation.isPending}
          >
            {createOrderMutation.isPending ? (
              <CircularProgress size={18} />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
