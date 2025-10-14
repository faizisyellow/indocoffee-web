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
} from "@mui/material";
import { useNavigate } from "react-router";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await loginSchema.validate(value, { abortEarly: false });
        console.log("Login form submitted:", value);
        navigate("/");
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log("Validation errors:", error.errors);
        }
      }
    },
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
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                margin="normal"
                sx={{ mb: 2 }}
              />
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                margin="normal"
                sx={{ mb: 3 }}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#000",
              py: 1.5,
              mb: 2,
              "&:hover": {
                bgcolor: "#333",
              },
            }}
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
