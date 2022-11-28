export default function MUIDataTable(theme) {
  return {
    MUIDataTableHeadCell: {
      sortAction: {
        '& path': {
          color: 'teal ', // or whatever you need
        },
      },
      sortActive: {
        color: 'red', // whatever you need
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  };
}
