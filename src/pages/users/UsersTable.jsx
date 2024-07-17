import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Snackbar, Alert, useTheme } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, styled, Paper, Stack, CircularProgress, Avatar } from "@mui/material";

const SearchInput = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
  flex: 1,
  marginRight: theme.spacing(1),
  border: "1px solid #ced4da",
  boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
  },
  "&:focus-within": {
    borderColor: theme.palette.primary.main,
  },
}));

const TableContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
  borderRadius: theme.shape.borderRadius,
}));

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`https://plazer-backend-production.up.railway.app/plazer-user`)
      .then((res) => {
        Promise.all(
          res.data.map((user) =>
            axios
              .get(
                `https://plazer-backend-production.up.railway.app/plazer-user/${user.userId}/image`
              )
              .then((response) => ({ ...user, image: response.data.image }))
              .catch(() => ({ ...user, image: "" }))
          )
        )
          .then((updatedUsers) => {
            setRows(updatedUsers);
            setFilteredRows(updatedUsers);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error fetching image URLs:", err);
            setRows(res.data);
            setFilteredRows(res.data);
            setLoading(false);
          });
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const handleFilter = useCallback(
    (event) => {
      const query = event.target.value.toLowerCase();
      const newData = rows.filter(
        (row) =>
          row.userName.toLowerCase().includes(query) ||
          row.role.toLowerCase().includes(query)
      );
      setFilteredRows(newData);
    },
    [rows]
  );

  const handleDisable = (userId, currentActiveStatus) => {
    axios
      .patch(
        `https://plazer-backend-production.up.railway.app/plazer-user/${userId}/active`,
        {
          active: !currentActiveStatus,
        }
      )
      .then((res) => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.userId === userId ? { ...row, active: !row.active } : row
          )
        );
        setFilteredRows((prevRows) =>
          prevRows.map((row) =>
            row.userId === userId ? { ...row, active: !row.active } : row
          )
        );
        setSnackbarMessage(
          `Plazer Admin ${
            !currentActiveStatus ? "Enabled" : "Disabled"
          } the User`
        );
        setSnackbarSeverity(!currentActiveStatus ? "success" : "error");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const columns = [
    {
      field: "userId",
      headerName: "ID",
      width:5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "Profile Image",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <Avatar alt="" src={params.row.image} />
        </Stack>
      ),
    },
    {
      field: "userName",
      headerName: "Name",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Email",
      headerName: "Email",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "active",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          // variant="contained"
          variant= "outlined"

          color={params.row.active ? "success" : "error"}
          onClick={() => handleDisable(params.row.userId, params.row.active)}
        >
          {params.row.active ? "Active" : "Inactive"}
        </Button>
      ),
    },
  ];

  return (
    <TableContainer>
      {loading ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Stack direction="row" alignItems="center" marginBottom={2}>
            <SearchIcon sx={{ color: "#063970", marginRight: "8px" }} />
            <SearchInput placeholder="Search User" onChange={handleFilter} />
          </Stack>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={10}
            checkboxSelection
            getRowId={(row) => row.userId}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              "& .MuiDataGrid-cell": {
                padding: theme.spacing(1),
              },
            }}
          />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </TableContainer>
  );
}
