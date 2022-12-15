import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
      (date) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            if (date.date == null) {
              reject(new Error("Error while saving date: name can't be empty."));
            } else {
              resolve({ ...date, date: date.date?.toLocaleDateString('en-CA') });
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
    async (newRow, oldRow) => {
      await fetch(`http://localhost:3000/record/${newRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: newRow.id,
          date: newRow.date.toLocaleDateString('en-CA'),
          time: newRow.time,
          activity: newRow.activity,
        }),
      }).catch((error) => {
        window.alert(error);
      });
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      return response;
    },
    [mutateRow]
  );

  // const valueSetter = (newValue, rowData) => {
  //   return {
  //     ...rowData,
  //     date: newValue, // Update the 'date' property in the row data
  //   };
  // };
  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      width: 400,
      type: 'date',
      flex: 1,
      editable: true,
      // valueSetter: (newValue, oldValue, newRow) => {
      //   if (newValue === oldValue) {
      //     return false; // Return false to cancel the change.
      //   }

      //   // Update the row with the new value.
      //   newRow = newValue;

      //   // Return true to signal that the value has been set.
      //   return true;
      // },
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 400,
      type: 'dateTime',
      flex: 1,
      editable: true,
    },
    { field: 'activity', headerName: 'Activity', width: 200, type: 'number', align: 'center', flex: 0 },
  ];
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);
  const getRowId = (rowData) => {
    return rowData._id;
  };
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
          getRowId={getRowId}
          experimentalFeatures={{ newEditingApi: true }}
          rows={tableData}
          columns={columns}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          // onCellValueChanged={valueSetter}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          // valueSetter={valueSetter}
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
