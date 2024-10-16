import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  Alert,
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
  const [code, setCode] = useState(Array(6).fill("")); // State for the 6-digit verification code
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const sendCode = async (event) => {
    event.preventDefault();
      // Reference the form
    const form = event.target;

    // Check if the form is valid
    if (!form.checkValidity()) {
      form.reportValidity();  // This will trigger the browser to show validation errors
      return;
      }

    try {
      const response= await axios.post('http://localhost:3000/send-code', { email });
      setErrorMessage("");
      // setSuccessMessage(response.data);
      handleNext();
    } catch (err) {
      setErrorMessage(err.response.data);
      console.error(err.response.data);
    }
  };

  const varAccount = async (event) => {
    event.preventDefault();
    const fullCode = code.join(""); // Combine the 6 individual code digits into a single string
    try {
      await axios.post('http://localhost:3000/verify-code', { email, code: fullCode });
      setErrorMessage("");
      handleNext();
    } catch (err) {
      setErrorMessage(err.response.data);
      console.error(err.response.data);
    }
  };

  const handleCodeChange = (index, value) => {
    // Update the specific digit in the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const ResetPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/reset-pass', { email, newPassword });
      setSuccessMessage(response.data);
      console.log("Message", response);
      handleNext();
    } catch (err) {
      setErrorMessage(err.response.data);
      console.error(err.response.data);
    }
  };

  return (
    <Container maxWidth="sm">
      {step === 1 && (
        <Card>
          <CardContent>
            <Box className="forgot-container">
              <Typography component="h1" variant="h5" className="forgot-header">
                Forgot Password
              </Typography>
              <Typography variant="body2" className="body-text">
                We’ll email you a link so you can reset your password.
              </Typography>
              <Box
                component="form"
                onSubmit={sendCode}
                noValidate
                className="forgot-form"
              >
                 { errorMessage && <Alert severity="error" className="alert">{errorMessage}</Alert>}
             
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="submit-button"
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
            {errorMessage && <Alert severity="error" className="alert">{errorMessage}</Alert>}
            <Box display="flex" justifyContent="center" className="otp-box">
              {[...Array(6)].map((_, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                  className="otp-input"
                  value={code[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)} // Update specific digit
                  required
                  />
              ))}
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
             { successMessage && <Alert severity="success" className="alert">{successMessage}</Alert>}
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
