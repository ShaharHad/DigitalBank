import { TextField, Button, Typography, Box, Alert, Paper } from "@mui/material";
import { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

export default function TransferPage() {

  const { user } = useAuth();

  const [form, setForm] = useState({
    userIdSender: null,
    userIdReceiver: "",
    amount: "",
    description: ""
  });

    useEffect(() => {
      if (user) {
        setForm((prev) => ({ ...prev, userId: user.id }));
      }
    }, [user]);

  const [message, setMessage] = useState({
    msg: "",
    severity: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({msg: "", severity: ""});

    const amountNum = parseFloat(amount);

    if (!userIdReceiver || isNaN(amountNum) || amountNum <= 0) {
      setMessage({
        msg: "Please enter a valid receiver id and deposit amount.",
        severity: "error"
      });
      return;
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, margin: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" mb={3}>
        Transfer
      </Typography>
      {message.msg && 
        <Alert severity={message.msg} sx={{ mb: 2 }}>
          {message.msg}
        </Alert>
      }

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="User ID Receiver"
          name="userIdReceiver"
          value={form.userIdReceiver}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Amount"
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
          slotProps={{
            input: {
              maxLength: 200,
            },
          }}
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="text"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Transfer
        </Button>
      </Box>
    </Paper>
  );
}