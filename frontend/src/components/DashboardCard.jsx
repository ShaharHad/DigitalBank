import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value, background }) => {
  return (
    <Card sx={{ bgcolor: background }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5" fontWeight="bold">
          ${value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;