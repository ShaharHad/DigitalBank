import { Container, TextField, Button, Typography, Box, Link, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { loginApi } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { setUserInSessionStorage } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email || !form.password) {
      return "Email and password are required.";
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      return "Invalid email format.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    loginApi(form).then((res) => {
      
      setUserInSessionStorage(res.data.user, res.data.token);
      navigate("/home");
    }).catch((err) =>{
      setError(err.messgae);
      return;
    });

    navigate("/");
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>

          <Box textAlign="center" mt={2}>
            <Link component={RouterLink} to="/register" variant="body2">
              Don’t have an account? Register
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
