import { Box, Typography } from "@mui/material";

interface CheckoutStepperProps {
  activeStep: number;
}

const steps = ["Shopping Cart", "Delivery Address", "Review Order"];

export default function CheckoutStepper({ activeStep }: CheckoutStepperProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 6,
        px: 2,
      }}
    >
      {steps.map((label, index) => (
        <Box
          key={label}
          sx={{
            display: "flex",
            alignItems: "center",
            flex: index < steps.length - 1 ? 1 : "none",
            maxWidth: index < steps.length - 1 ? 300 : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "2px solid",
                borderColor: index <= activeStep ? "#0b341b" : "#ccc",
                bgcolor:
                  index < activeStep
                    ? "#0b341b"
                    : index === activeStep
                      ? "#fff"
                      : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
                transition: "all 0.3s",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: index <= activeStep ? "#0b341b" : "transparent",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                fontWeight: index === activeStep ? 600 : 400,
                color: index <= activeStep ? "#000" : "#999",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Typography>
          </Box>

          {index < steps.length - 1 && (
            <Box
              sx={{
                flex: 1,
                height: 2,
                bgcolor: index < activeStep ? "#0b341b" : "#ccc",
                mx: 2,
                transition: "background-color 0.3s",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
