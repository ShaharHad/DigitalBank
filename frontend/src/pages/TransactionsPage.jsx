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

const TransactionPage = () => {

  const { user } = useAuth();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(user.id); // need to return array
        setTransactions(data);
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{new Date(tx.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TransactionPage;
