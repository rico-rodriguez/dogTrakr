import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'time', headerName: 'Time', width: 400, editable: true },
  { field: 'activity', headerName: 'Activity', width: 400, type: 'number' },
];

const rows = [
  { time: 1120, activity: 'Walk' },
  { time: 1100, activity: 'Potty' },
  { time: 1020, activity: 'Meal' },
  { time: 930, activity: 'Medicine' },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.time}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowHeight={60}
        // checkboxSelection
      />
    </div>
  );
}
