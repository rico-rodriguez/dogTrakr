import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Grid } from '@mui/material';
// components
import { LogNewActivity } from '../sections/@dashboard/products';
import { Modal } from '../sections/@dashboard/products';
import { DataTable } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Activity | Woof </title>
      </Helmet>

      <Typography variant="h4" sx={{ mb: 5 }}>
        Activity
      </Typography>

      <Modal />
    </>
  );
}
