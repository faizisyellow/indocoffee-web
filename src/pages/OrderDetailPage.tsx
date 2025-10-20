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
  capitalize,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrdersService } from "../service/orders";
import { clientWithAuth } from "../service/axios";
import { prettyErrorServer } from "../utils/prettyErrorServer";
import { useAlert } from "../hooks/useAlert";

const STATUS_COLORS = {
  confirm: "#1976d2",
  roasting: "#f57c00",
  cancelled: "#d32f2f",
  shipped: "#0288d1",
  complete: "#2e7d32",
} as const;

export default function OrderDetailPage() {
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const queryClient = useQueryClient();
  const orderService = new OrdersService(clientWithAuth);

  const {
    data: orderDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => {
      return orderService.GetOrderDetail(id!);
    },
  });

  const completeOrderMutation = useMutation({
    mutationFn: () => {
      return orderService.CompleteOrder(id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
      queryClient.invalidateQueries({ queryKey: ["users_orders"] });
      alert.success("Your order has been marked as complete");
      setCompleteOpen(false);
    },
    onError: (error) => {
      const errorMessage = prettyErrorServer(error);
      alert.error(
        errorMessage || "Failed to complete order. Please try again.",
      );
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: () => {
      return orderService.CancelOrder(id!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
      queryClient.invalidateQueries({ queryKey: ["users_orders"] });
      alert.success("Your order has been cancelled successfully");
      setConfirmOpen(false);
    },
    onError: (error) => {
      const errorMessage = prettyErrorServer(error);
      alert.error(errorMessage || "Failed to cancel order. Please try again.");
    },
  });

  const errorServer = prettyErrorServer(error);

  const handleCancel = () => {
    cancelOrderMutation.mutate();
  };

  const handleComplete = () => {
    completeOrderMutation.mutate();
  };

  function handleGoBack() {
    navigate("/account");
  }

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

  if (!orderDetail) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Order not found.</Alert>
      </Container>
    );
  }

  const orderStatus = orderDetail.status?.toLowerCase();
  const isCancellable = orderStatus === "confirm";
  const isCompletable = orderStatus === "shipped";
  const isCancelled = orderStatus === "cancelled";

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
          {orderDetail.items?.map((item) => (
            <Box key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  py: 3,
                }}
              >
                <Box
                  component="img"
                  src={item.image ?? ""}
                  alt={item.bean_name ?? "Product"}
                  sx={{
                    width: 120,
                    height: 150,
                    flexShrink: 0,
                    objectFit: "cover",
                    bgcolor: "#f9f9f9",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.bean_name?.toUpperCase() ?? ""}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}
                  >
                    ${item.price?.toFixed(2) ?? "0.00"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1 }}
                  >
                    {`${item.form_name?.toUpperCase() ?? ""} | ${item.roasted?.toUpperCase() ?? ""}`}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, mt: 2 }}>
                    {item.order_quantity ?? 0}x
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
                {orderDetail.id ?? "N/A"}
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
              <Typography variant="body1">Order at</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {orderDetail.created_at
                  ? new Date(orderDetail.created_at).toLocaleString()
                  : "N/A"}
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
                {orderDetail.customer_email ?? "N/A"}
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
                {capitalize(String(orderDetail.customer_name ?? ""))}
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
                {`${capitalize(String(orderDetail.street ?? ""))}, ${capitalize(
                  String(orderDetail.city ?? ""),
                )}`}
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
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color:
                    STATUS_COLORS[orderStatus as keyof typeof STATUS_COLORS] ||
                    "#555",
                }}
              >
                {capitalize(String(orderDetail.status ?? ""))}
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
                ${orderDetail.total_price?.toFixed(2) ?? "0.00"}
              </Typography>
            </Box>
          </Box>

          {!isCancelled && (
            <Box sx={{ mt: 4 }}>
              {isCancellable && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, fontSize: "0.875rem", color: "text.disabled" }}
                  >
                    • You can cancel your order before it starts roasting
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setConfirmOpen(true)}
                    disabled={cancelOrderMutation.isPending}
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
                    {cancelOrderMutation.isPending ? "CANCELLING..." : "CANCEL"}
                  </Button>
                </>
              )}

              {isCompletable && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, fontSize: "0.875rem", color: "text.disabled" }}
                  >
                    • Mark as complete once you've received your order
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setCompleteOpen(true)}
                    disabled={completeOrderMutation.isPending}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                    }}
                  >
                    {completeOrderMutation.isPending
                      ? "COMPLETING..."
                      : "COMPLETE"}
                  </Button>
                </>
              )}
            </Box>
          )}
        </Paper>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            disabled={cancelOrderMutation.isPending}
          >
            No, Keep Order
          </Button>
          <Button
            onClick={handleCancel}
            variant="contained"
            color="warning"
            disabled={cancelOrderMutation.isPending}
          >
            {cancelOrderMutation.isPending
              ? "Cancelling..."
              : "Yes, Cancel Order"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={completeOpen} onClose={() => setCompleteOpen(false)}>
        <DialogTitle>Confirm Order Completion</DialogTitle>
        <DialogContent>
          <Typography>
            Have you received your order? Marking as complete will finalize this
            order.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCompleteOpen(false)}
            variant="outlined"
            disabled={completeOrderMutation.isPending}
          >
            Not Yet
          </Button>
          <Button
            onClick={handleComplete}
            variant="contained"
            color="success"
            disabled={completeOrderMutation.isPending}
          >
            {completeOrderMutation.isPending
              ? "Completing..."
              : "Yes, Mark Complete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
