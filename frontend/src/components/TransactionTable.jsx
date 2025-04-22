import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TransactionTable = ({transactions}) => {

return (<TableContainer component={Paper}>
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
            {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{new Date(transaction.created_at).toLocaleString()}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>);
}

export default TransactionTable;

