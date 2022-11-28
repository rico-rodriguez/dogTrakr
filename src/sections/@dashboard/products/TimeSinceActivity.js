import { React, useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { fToNow } from '../../../utils/formatTime';

export default async function TimeSince(timeSinceActivity) {
  const [timeSinceActivity, setTimeSinceActivity] = useState(0);
  let timePassed = 0;
  useEffect(() => {
    fetch('http://localhost:5000/record/')
      .then((data) => data.json())
      .then((data) => setTimeSinceActivity(data));
  }, []);
  timePassed = timeSinceActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
  const time = fToNow(timePassed[0].date);
  console.log(time);
  return (
    <Typography variant="h4" sx={{ color: 'text.secondary' }}>
      The time is {time}
    </Typography>
  );
}
