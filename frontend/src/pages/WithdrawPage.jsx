import { TextField, Button, Typography, Box, Alert, Paper } from "@mui/material";
import { useState, useEffect} from "react";

import {withdrawApi} from '../api/transaction';
import { useAuth } from "../contexts/AuthContext";

export default function WithdrawPage() {

  const {user} = useAuth();

  const [form, setForm] = useState({
     userId: null, 
     amount: "", 
     description: ""
    });
  const [message, setMessage] = useState({
    msg: "",
    severity: ""
  });

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
      setMessage({msg: "", severity: ""});
        
      const amountNum = parseFloat(form.amount);
  
      if (isNaN(amountNum) || amountNum <= 0) {
        setMessage({
          msg: "Please enter a valid withdraw amount.",
          severity: "error"
        });
        return;
      }

      withdrawApi(form).then((res) => {
        setMessage({
          msg: "withdraw successes",
          severity: "success"
        })
      }).catch((err) => {
        setMessage({
          msg: err.message,
          severity: "error"
        })
      });
    };
  
    return (
      <Paper elevation={3} sx={{ maxWidth: 400, margin: "auto", mt: 6, p: 4 }}>
        <Typography variant="h5" mb={3}>
          Withdraw
        </Typography>
        {message.msg && <Alert severity={message.severity} sx={{ mb: 2 }}>{message.msg}</Alert>}
  
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
            Withdraw
          </Button>
        </Box>
      </Paper>
    );
}