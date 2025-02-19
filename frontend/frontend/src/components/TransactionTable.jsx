// Frontend (React + Material UI)
import { useEffect, useState } from "react";
import { fetchTransactions } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Button,
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    store: "",
    category: "",
    title: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchTransactions(filters).then(setTransactions);
  }, [filters]);

  return (
    <Box className="max-w-4xl mx-auto mt-10" sx={{ padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Transaction List
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search Store"
            variant="outlined"
            fullWidth
            value={filters.store}
            onChange={(e) => setFilters({ ...filters, store: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search Category"
            variant="outlined"
            fullWidth
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12}>
          <TextField
            label="Search Title"
            variant="outlined"
            fullWidth
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Min Price"
            variant="outlined"
            type="number"
            fullWidth
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Max Price"
            variant="outlined"
            type="number"
            fullWidth
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<ClearIcon />}
        onClick={() => setFilters({ store: "", category: "", title: "", minPrice: "", maxPrice: "" })}
      >
        Reset Filters
      </Button>

      {/* Table */}
      <TableContainer component={Paper} className="mt-3 mb-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Order Data</TableCell>
              <TableCell>pid</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Status</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <TableRow key={t.txid}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.store}</TableCell>
                  <TableCell>{t.title}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell>${t.price.toFixed(2)}</TableCell>
                  <TableCell>{t.order_date}</TableCell>
                  <TableCell>{t.pid}</TableCell>
                  <TableCell>{t.commission}</TableCell>
                  <TableCell>{t.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionTable;