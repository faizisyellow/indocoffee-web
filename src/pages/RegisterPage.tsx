import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import * as yup from "yup";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import type { RegisterRequest } from "../service/axios/type";
import { AuthenticationService } from "../service/authentication";
import { client } from "../service/axios";
import { prettyErrorServer } from "../utils/prettyErrorServer";

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include at least one uppercase letter, one number, and one symbol",
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const authService = new AuthenticationService(client);

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => {
      return authService.register(payload);
    },
    onSuccess: (response) => {
      localStorage.clear();
      localStorage.setItem("token", response.token);
      navigate("/");
    },
  });

  const errorServer = prettyErrorServer(registerMutation.error, {
    409: "This email is already registered. Try signing in instead.",
    404: "We couldn’t verify your registration.",
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setErrors({});
        await registerSchema.validate(value, { abortEarly: false });

        registerMutation.mutate({
          username: value.name,
          email: value.email,
          password: value.password,
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const newErrors: Record<string, string> = {};
          error.inner.forEach((err) => {
            if (err.path && !newErrors[err.path])
              newErrors[err.path] = err.message;
          });
          setErrors(newErrors);
        }
      }
    },
  });

  const handlePreConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setErrors({});
      await registerSchema.validate(form.state.values, { abortEarly: false });
      setOpenConfirm(true);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path && !newErrors[err.path])
            newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleConfirmSubmit = () => {
    setOpenConfirm(false);
    form.handleSubmit();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}
        >
          Register
        </Typography>

        {registerMutation.isError && errorServer && (
          <Alert severity="error" sx={{ my: 4 }}>
            {errorServer}
          </Alert>
        )}

        <form onSubmit={handlePreConfirmSubmit}>
          <form.Field
            name="name"
            children={(field) => (
              <Box>
                <TextField
                  fullWidth
                  label="Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  margin="normal"
                  sx={{ mb: 1 }}
                  error={Boolean(errors.name)}
                />
                {errors.name && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {errors.name}
                  </Typography>
                )}
              </Box>
            )}
          />

          <form.Field
            name="email"
            children={(field) => (
              <Box>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  margin="normal"
                  sx={{ mb: 1 }}
                  error={Boolean(errors.email)}
                />
                {errors.email && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {errors.email}
                  </Typography>
                )}
              </Box>
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <Box>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  margin="normal"
                  sx={{ mb: 1 }}
                  error={Boolean(errors.password)}
                />
                {errors.password && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {errors.password}
                  </Typography>
                )}
              </Box>
            )}
          />

          <form.Field
            name="confirmPassword"
            children={(field) => (
              <Box>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  margin="normal"
                  sx={{ mb: 1 }}
                  error={Boolean(errors.confirmPassword)}
                />
                {errors.confirmPassword && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", mb: 2 }}
                  >
                    {errors.confirmPassword}
                  </Typography>
                )}
              </Box>
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.5, my: 2 }}
          >
            REGISTER
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="confirm-register-title"
      >
        <DialogTitle id="confirm-register-title">
          Confirm Registration
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create this account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
