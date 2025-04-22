import { Container, Typography, Grid, Card, CardContent, CircularProgress, Alert} from "@mui/material";
import { useEffect, useState } from "react";

import { dashboardApi } from '../api/dashboard';
import { useAuth } from "../contexts/AuthContext";
import TransactionTable from "../components/TransactionTable";
import DashboardCard from "../components/DashboardCard";

const DashboardPage = () => {

  const {user} = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!user){
      return;
    }

    const loadDashboard = async() => {
      try {
        const data = await dashboardApi(user.id);
        setDashboardData(data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [user]);

  if (!user || loading) {
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardCard title={"Balance"} background={"#e3f2fd"} value={dashboardData.balance.toFixed(2)}/>
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardCard title={"Total Deposits"} background={"#e8f5e9"} value={dashboardData.totalDeposits.toFixed(2)}/>
        </Grid>

        <Grid item xs={12} md={4}>
          <DashboardCard title={"Total Withdrawals"} background={"#ffebee"} value={dashboardData.totalWithdrawals.toFixed(2)}/>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Recent Transactions
      </Typography>
      <TransactionTable transactions={dashboardData.lastTransactions}/>
    </Container>
  );
}

export default DashboardPage;