import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Container, Typography, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CreateRecord from './CreateRecord';
import LogNewActivity from './LogNewActivity';
import { DataTable } from '.';
import TimeSince from './TimeSinceActivity';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="text"
              onClick={handleClickOpen}
              fullWidth
              sx={[
                {
                  '&:hover': {
                    transform: 'scale(.90)',
                    opacity: 0.7,
                  },
                },
              ]}
            >
              <LogNewActivity
                title=<TimeSince activityType="Walk" />
                activity="walk"
                icon={'healthicons:guide-dog-outline'}
              />
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="text"
              onClick={handleClickOpen}
              fullWidth
              sx={[
                {
                  '&:hover': {
                    transform: 'scale(.90)',
                    opacity: 0.7,
                  },
                },
              ]}
            >
              <LogNewActivity title=<TimeSince activityType="Potty" /> color="info" activity="potty" icon={'la:poop'} />
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="text"
              onClick={handleClickOpen}
              fullWidth
              sx={[
                {
                  '&:hover': {
                    transform: 'scale(.90)',
                    opacity: 0.7,
                  },
                },
              ]}
            >
              <LogNewActivity
                title=<TimeSince activityType="Meal" />
                color="warning"
                activity="meal"
                icon={'tabler:dog-bowl'}
              />
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="text"
              onClick={handleClickOpen}
              fullWidth
              sx={[
                {
                  '&:hover': {
                    transform: 'scale(.90)',
                    opacity: 0.7,
                  },
                },
              ]}
            >
              <LogNewActivity
                title=<TimeSince activityType="Medication" />
                color="error"
                activity="medication"
                icon={'ph:pill-light'}
              />
            </Button>
          </Grid>
          <DataTable />
          <Dialog open={open} onClose={handleClose}>
            <DialogContent
              sx={{
                width: {
                  xs: 500, // theme.breakpoints.up('xs')
                  sm: 500, // theme.breakpoints.up('sm')
                  md: 500, // theme.breakpoints.up('md')
                  lg: 500, // theme.breakpoints.up('lg')
                  xl: 500, // theme.breakpoints.up('xl')
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CreateRecord handleClose={handleClose} />
            </DialogContent>
          </Dialog>
        </Grid>
      </Container>
    </div>
  );
}
