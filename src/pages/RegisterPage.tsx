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

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await registerSchema.validate(value, { abortEarly: false });
        console.log("Register form submitted:", value);
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
          Register
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => (
              <TextField
                fullWidth
                label="Name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                margin="normal"
                sx={{ mb: 2 }}
              />
            )}
          />

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
                sx={{ mb: 2 }}
              />
            )}
          />

          <form.Field
            name="confirmPassword"
            children={(field) => (
              <TextField
                fullWidth
                label="Confirm Password"
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
              py: 1.5,
              mb: 2,
            }}
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
                  console.log("Navigate to login");
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
    </Container>
  );
}
