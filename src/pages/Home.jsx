import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, MenuItem, TextField, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/api";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchProducts(pageSize , page)
      .then(({data, total}) => {
        setRows(data);
        setRowCount(total); 
      })
      .catch(() => setError("Error fetching data"))
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  // custom filter
  let filteredRows = rows;

  if (search) {
    filteredRows = filteredRows.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (category) {
    filteredRows = filteredRows.filter((item) => item.category === category);
  }

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => <img src={params.row.image} width={50} alt="" />,
      sortable: false,
    },
    { field: "name", headerName: "Name", flex: 2, sortable: false },
    { field: "category", headerName: "Category", flex: 1, sortable: false },
    { field: "price", headerName: "Price", flex: 1 },
  ];

  // for error
  if (error)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <p>{error}</p>
      </Box>
    );

  return (
  <div style={{ border: "1px solid #998f8f", marginTop: "10px" }}>
    
    {/* Top Filters */}
    <Grid container spacing={2} sx={{ p: 2 }}>
      
      {/* Search */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Grid>

      {/* Category */}
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="beauty">Beauty</MenuItem>
          <MenuItem value="fragrances">Fragrances</MenuItem>
          <MenuItem value="furniture">Furniture</MenuItem>
          <MenuItem value="groceries">Groceries</MenuItem>
        </TextField>
      </Grid>

    </Grid>

    {/* DataGrid */}
    <Grid sx={{ height: { xs: 400, sm: 500 }, width: "100%", px: 2, pb: 2 }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={rowCount}
        loading={loading}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(params) => navigate(`/product/${params.id}`)}
      />
    </Grid>

  </div>
);
}
