import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Alert, Paper } from "@mui/material";

import useDeposit from "../hooks/useDeposit";
import { useAuth } from "../contexts/AuthContext";

const DepositPage = () => {
  const { user } = useAuth();
  const { triggerDeposit, loading, error } = useDeposit();

  const [form, setForm] = useState({ userId: null, amount: "", description: "" });
  const [message, setMessage] = useState({ msg: "", severity: "" });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ msg: "", severity: "" });

    const amountNum = parseFloat(form.amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setMessage({
        msg: "Please enter a valid deposit amount.",
        severity: "error",
      });
      return;
    }

    const result = await triggerDeposit(form);
    if (result) {
      setMessage({ msg: "Deposit successful", severity: "success" });
      setForm((prev) => ({ ...prev, amount: "", description: "" }));
    } else if (error) {
      setMessage({ msg: error, severity: "error" });
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, margin: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" mb={3}>
        Deposit
      </Typography>

      {message.msg && (
        <Alert severity={message.severity} sx={{ mb: 2 }}>
          {message.msg}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="text"
          slotProps={{
            input: {
              maxLength: 200,
            },
          }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? "Processing..." : "Deposit"}
        </Button>
      </Box>
    </Paper>
  );
};

export default DepositPage;