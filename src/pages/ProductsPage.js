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

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Activity
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <LogNewActivity
              title="Last walk: 48m ago"
              activity=<Typography variant="h4" sx={{ color: 'dodgerblue' }}>
                Walk
              </Typography>
              icon={'healthicons:guide-dog-outline'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <LogNewActivity
              title="Last potty: 1hr ago"
              color="info"
              activity=<Modal
                modaltitle="Potty"
                modalLinkText=<Typography variant="h4" sx={{ color: 'dodgerblue' }}>
                  Potty
                </Typography>
                modalContent="test"
              />
              icon={'la:poop'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <LogNewActivity
              title="Last meal: 10m ago"
              color="warning"
              activity=<Modal
                modaltitle="Meal"
                modalLinkText=<Typography variant="h4" sx={{ color: 'dodgerblue' }}>
                  Meal
                </Typography>
                modalContent="test"
              />
              icon={'tabler:dog-bowl'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <LogNewActivity
              title="Last medicine: 3hr20m ago"
              color="error"
              activity=<Modal
                modaltitle="Medicine"
                modalLinkText=<Typography variant="h4" sx={{ color: 'dodgerblue' }}>
                  Medicine
                </Typography>
                modalContent="test"
              />
              icon={'ph:pill-light'}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <DataTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
