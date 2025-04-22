import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

import { useAuth } from "../contexts/AuthContext";
import { getTransactions } from "../api/transaction";
import TransactionTable from "../components/TransactionTable";

const TransactionPage = () => {

  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user){
      return;
    }
    const fetchTransactions = async () => {
      try {
        const transactions = await getTransactions(user.id);
        setTransactions(transactions);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TransactionTable transactions={transactions}/>
      )}
    </Container>
  );
};

export default TransactionPage;
