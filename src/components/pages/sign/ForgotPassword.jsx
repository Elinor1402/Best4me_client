import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); // State to represent the email
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [acceptTerms, setAcceptTerms] = useState(false); // State for accepting terms

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const sendCode = (event) => {
    event.preventDefault();
    handleNext();
    // Handle the form submission
  };

  const varAccount = (event) => {
    event.preventDefault();
    handleNext();
    // Handle the form submission
  };

  const ResetPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      {step === 1 && (
        <Card>
          <CardContent>
            <Box className="container">
              <Typography component="h1" variant="h5" className="header">
                Forgot Password
              </Typography>
              <Typography variant="body2" className="body-text">
                We’ll email you a link so you can reset your password.
              </Typography>
              <Box
                component="form"
                onSubmit={sendCode}
                noValidate
                className="form"
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email} // Bind the value to the state
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="submit-button"
                  // onClick={sendCode}
                >
                  Reset Password
                </Button>
                <Box className="center-text">
                  <Typography variant="body2">
                    or{" "}
                    <Link href="/login" className="login-link">
                      Log in
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
      {step === 2 && (
        <Card>
          <CardContent className="card-content">
            <Typography component="h1" variant="h5" className="header">
              Email Verification
            </Typography>
            <Typography variant="body2" className="body-text">
              We have sent a code to your email {email}
            </Typography>
            <Box display="flex" justifyContent="center" className="otp-box">
              <TextField
                variant="outlined"
                inputProps={{ maxLength: 1 }}
                className="otp-input"
              />
              <TextField
                variant="outlined"
                inputProps={{ maxLength: 1 }}
                className="otp-input"
              />
              <TextField
                variant="outlined"
                inputProps={{ maxLength: 1 }}
                className="otp-input"
              />
              <TextField
                variant="outlined"
                inputProps={{ maxLength: 1 }}
                className="otp-input"
              />
            </Box>
            <Button
              onClick={varAccount}
              variant="contained"
              color="primary"
              fullWidth
              className="submit-button"
            >
              Verify Account
            </Button>
            <Typography variant="body2" className="resend-otp">
              Didn't receive code? Resend OTP in 52s
            </Typography>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="card-content">
            <Typography component="h1" variant="h5" className="header">
              Change Password
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  color="primary"
                />
              }
              label="I accept the Terms and Conditions"
            />
            <Button
              onClick={ResetPassword}
              variant="contained"
              color="primary"
              fullWidth
              className="submit-button"
            >
              Reset Password
            </Button>
            <Button
              onClick={handlePrevious}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Back
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ForgotPassword;
