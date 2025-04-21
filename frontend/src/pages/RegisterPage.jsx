import { Container,TextField,Button,Typography,Box,Link,Alert } from "@mui/material";
  import { useState } from "react";
  import { useNavigate, Link as RouterLink } from "react-router-dom";

  import {registerApi} from '../api/auth';
   
  export default function RegisterPage() {
    const navigate = useNavigate();
  
    const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const validate = () => {
      if (!form.name || !form.email || !form.password) {
        return "All fields are required.";
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(form.email)) {
        return "Invalid email format.";
      }
      if (form.password.length < 6) {
        return "Password must be at least 6 characters.";
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
  
      registerApi(form).then((res) => {
        console.log("Registering:", res);
  
        navigate("/login");
      }).catch((err) => {
        setError(err.message);
        return;
      });
    };
  
    return (
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
  
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}
  
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              margin="normal"
              value={form.name}
              onChange={handleChange}
              required
            />
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
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              margin="normal"
              value={form.phone}
              onChange={handleChange}
              required
            />
  
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Sign Up
            </Button>
  
            <Box textAlign="center" mt={2}>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }
  