import { useForm } from "@tanstack/react-form";
import * as yup from "yup";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "../service/axios/type";
import { AuthenticationService } from "../service/authentication";
import { client } from "../service/axios";
import { prettyErrorServer } from "../utils/prettyErrorServer";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const authService = new AuthenticationService(client);

  const loginMutation = useMutation({
    mutationFn: (cred: LoginRequest) => {
      return authService.login(cred);
    },
    onSuccess: (response) => {
      localStorage.clear();
      localStorage.setItem("token", response.token);
      navigate("/");
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setErrors({});
        await loginSchema.validate(value, { abortEarly: false });

        loginMutation.mutate({
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

  const errorServer = prettyErrorServer(loginMutation.error, {
    400: "Your email or password is incorrect",
    404: "You don't have an account. Please register first",
    429: "Too many login attempts — Your account is temporarily locked. Try again in 12 hours or reset your password.",
  });

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}
        >
          Login
        </Typography>

        {loginMutation.isError && errorServer && (
          <Alert severity="error" sx={{ my: 4 }}>
            {errorServer}
          </Alert>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
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
                  sx={{ mb: 0.5 }}
                  error={Boolean(errors.email)}
                />
                {errors.email && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", mb: 2 }}
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
                  sx={{ mb: 0.5 }}
                  error={Boolean(errors.password)}
                />
                {errors.password && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ display: "block", mb: 3 }}
                  >
                    {errors.password}
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
            LOGIN
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Navigate to register");
                  navigate("/register");
                }}
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
