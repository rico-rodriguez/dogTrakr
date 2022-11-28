import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns = [
  { field: 'date', headerName: 'Date', width: 400, type: 'dateTime', flex: 1 },
  { field: 'time', headerName: 'Time', width: 400, type: 'dateTime', flex: 1 },
  { field: 'activity', headerName: 'Activity', width: 200, type: 'number', align: 'center', flex: 0 },
];

export default function DataTable() {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = React.useState(5);

  useEffect(() => {
    fetch('http://localhost:5000/record/')
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);
  console.log(tableData);

  return (
    <Box
      sx={{
        height: 300,
        width: '100%',
        '& .walk': {
          backgroundColor: '#b9d5ff91',
          backgroundImage: 'linear-gradient(315deg, #b9d5ff91 0%, #d1e9fc 74%)',
          borderRadius: '5px',
          boxShadow: '0 0 10px 0 #9ca8ff91',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundImage: 'gradient(315deg, #b9d5ff91 0%, #9ca8ff91 74%)',
          borderRadius: '5px',
          boxShadow: '0 0 10px 0 #9ca8ff91',
          color: '#1a3e72',
          transform: 'scale(1.01)',
        },
        '& .MuiDataGrid-row.Mui-selected, .MuiDataGrid-row.Mui-selected:hover': {
          backgroundImage: 'linear-gradient(315deg, #fff 0%, #fff 74%)',
          borderRadius: '5px',
          boxShadow: '0 0 10px 0 #9ca8ff91',
          color: '#1a3e72',
        },
        '& .meal': {
          backgroundColor: '#ff943975',
          backgroundImage: 'linear-gradient(315deg, #fff3b4 0%, #fff7cd 74%)',
          borderRadius: '5px',
          boxShadow: '0 0 10px 0 #9ca8ff91',
        },
        '& .medication': {
          backgroundColor: '#a5ff8e75',
          backgroundImage: 'linear-gradient(315deg, #ffe7d9 0%, #ffd8c1 74%)',
          borderRadius: '5px',
          boxShadow: '0 0 10px 0 #9ca8ff91',
        },
      }}
    >
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          getCellClassName={(params) => {
            if (params.field === 'date' || params.field === 'time') {
              return '';
            }
            return params.value === 'Walk' ? 'walk' : params.value === 'Meal' ? 'meal' : 'medication';
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
          }}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
          rows={tableData}
          // sortModel={[{ field: 'time', sort: 'asc' }]}
          columns={columns}
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
      </div>
    </Box>
  );
}
