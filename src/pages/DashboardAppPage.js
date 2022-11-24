import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import account from '../_mock/account';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
// icons

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Home | Woof </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {account.displayName.split(/\s(.+)/)[0]}!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="47m" activity="Time since last walk" icon={'healthicons:guide-dog-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="1hr" color="info" activity="Time since last potty" icon={'la:poop'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="10m" color="warning" activity="Time since last meal" icon={'tabler:dog-bowl'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="3hr20m"
              color="error"
              activity="Time since last medication"
              icon={'ph:pill-light'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Your dog's activity"
              subheader="This week"
              chartLabels={[
                '01/01/2022',
                '01/02/2022',
                '01/03/2022',
                '01/04/2022',
                '01/05/2022',
                '01/06/2022',
                '01/07/2022',
                '01/08/2022',
              ]}
              chartData={[
                {
                  name: 'Walks',
                  type: 'column',
                  fill: 'solid',
                  data: [3, 2, 1, 3, 2, 5, 2, 1],
                },
                {
                  name: 'Potty',
                  type: 'area',
                  fill: 'gradient',
                  data: [1, 2, 3, 2, 1, 2, 3, 2],
                },
                {
                  name: 'Meals',
                  type: 'line',
                  fill: 'solid',
                  data: [2, 1, 2, 3, 2, 1, 2, 3],
                },
                {
                  name: 'Medication',
                  type: 'line',
                  fill: 'solid',
                  data: [2, 1, 2, 3, 2, 1, 2, 3],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Your dog's activity"
              chartData={[
                { label: 'Walks', value: 15 },
                { label: 'Potty', value: 10 },
                { label: 'Meals', value: 24 },
                { label: 'Medication', value: 12 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Take dog for a walk' },
                { id: '2', label: 'Feed dog' },
                { id: '3', label: 'Give dog medication' },
                { id: '4', label: 'Take dog for a walk' },
                { id: '5', label: 'Bath' },
                { id: '6', label: 'Training practice' },
                { id: '7', label: 'Playtime' },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Pet Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: ['Walked for 30 minutes', 'Grooming', 'Potty break', 'Ate 1 cup of food', 'Medication'][index],
                type: `order${index + 1}`,
                time: faker.date.recent(2),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppNewsUpdate
              title="Community Updates"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
