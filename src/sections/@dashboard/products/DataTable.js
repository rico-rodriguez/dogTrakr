import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const columns = [
  { field: 'date', headerName: 'Date', width: 400, type: 'dateTime', flex: 1, editable: true },
  { field: 'time', headerName: 'Time', width: 400, type: 'dateTime', flex: 1, editable: true },
  { field: 'activity', headerName: 'Activity', width: 200, type: 'number', align: 'center', flex: 0 },
];

export default function DataTable() {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = React.useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      fetch('http://localhost:3000/record/')
        .then((data) => data.json())
        .then((data) =>
          setTableData(
            data.map((record) => ({
              ...record,
              id: record._id, // Add the 'id' property to each record
            }))
          )
        );
    }, 500);
    return () => clearInterval(timer);
  }, []);
  const useFakeMutation = () => {
    return React.useCallback(
      (user) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (user.name?.trim() === '') {
              reject(new Error("Error while saving user: name can't be empty."));
            } else {
              resolve({ ...user, name: user.name?.toUpperCase() });
            }
          }, 200)
        ),
      []
    );
  };
  const mutateRow = useFakeMutation();
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;
    },
    [mutateRow]
  );
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);
  return (
    <Box
      sx={{
        height: 300,
        width: '100%',
        '& .walk': {
          backgroundImage: 'linear-gradient(315deg, #b9d5ff91 2%, #d1e9fc 2%) ',
          borderRadius: '2px',
          boxShadow: '1px 0 5px 0 #9ca8ff91',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundImage: 'gradient(315deg, #b9d5ff91 0%, #9ca8ff91 74%)',
          borderRadius: '2px',
          boxShadow: '1px 0 5px 0 #9ca8ff91',
          color: '#1a3e72',
          transform: 'scale(.99)',
          opacity: 0.5,
        },
        '& .MuiDataGrid-row.Mui-selected, .MuiDataGrid-row.Mui-selected:hover': {
          backgroundImage: 'linear-gradient(315deg, #fff 0%, #fff 74%)',
          borderRadius: '2px',
          boxShadow: '1px 0 5px 0 #9ca8ff91',
          color: '#1a3e72',
        },
        '& .meal': {
          backgroundColor: '#ff943975',
          backgroundImage: 'linear-gradient(315deg, #fff3b4 0%, #fff7cd 74%)',
          borderRadius: '2px',
          boxShadow: '1px 0 5px 0 #9ca8ff91',
        },
        '& .medication': {
          backgroundColor: '#a5ff8e75',
          backgroundImage: 'linear-gradient(315deg, #ffe7d9 0%, #ffd8c1 74%)',
          borderRadius: '2px',
          boxShadow: '1px 0 5px 0 #9ca8ff91',
        },
        '& .potty': {
          backgroundColor: '#a5ff8e75',
          backgroundImage: 'linear-gradient(315deg, #dcf4fe 0%, #e8f7fe 74%)',
          borderRadius: '2px',
          boxShadow: '1px 0 5px 0 #9ca8ff91',
        },
      }}
    >
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          getCellClassName={(params) => {
            if (params.field === 'date' || params.field === 'time') {
              return '';
            }
            return params.value === 'Walk'
              ? 'walk'
              : params.value === 'Meal'
              ? 'meal'
              : params.value === 'Potty'
              ? 'potty'
              : 'medication';
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
          }}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          experimentalFeatures={{ newEditingApi: true }}
          rows={tableData}
          columns={columns}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          rowHeight={60}
          header
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            padding: 2,
            margin: 2,
            overflow: 'hidden',
            boxShadow: (theme) => theme.customShadows.z8,
            ':hover': {
              boxShadow: (theme) => theme.customShadows.z16,
              header: { backgroundColor: 'white' },
            },
            ':active': { boxShadow: (theme) => theme.customShadows.z24 },
          }}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </Box>
  );
}
