import { React, useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { fToNow } from '../../../utils/formatTime';

export default function TimeSince({ activityType }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/record`);
        const usefulData = await response.json();
        setData(usefulData);
      } catch (e) {
        console.error(`An error occurred: ${e}`);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Check if data is defined before accessing its properties
  if (data && data.length) {
    // Find the most recent activity of the specified type
    const mostRecentActivity = data.find((activity) => activity.activity === activityType);
    if (mostRecentActivity) {
      const lastActivityTime = mostRecentActivity.time;
      const lastActivityDate = mostRecentActivity.date;
      const lastActivityTimeSliceHour = lastActivityTime.slice(0, 2);
      const lastActivityTimeSliceMinute = lastActivityTime.slice(3, 5);
      const lastActivityDateSliceYear = lastActivityDate.slice(0, 4);
      const lastActivityDateSliceMonth = lastActivityDate.slice(5, 7);
      const lastActivityDateSliceDay = lastActivityDate.slice(8, 10);
      const lastActivityToValidDate = new Date(
        lastActivityDateSliceYear,
        lastActivityDateSliceMonth - 1,
        lastActivityDateSliceDay,
        lastActivityTimeSliceHour,
        lastActivityTimeSliceMinute
      );
      const timeSince = fToNow(lastActivityToValidDate);
      return (
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {timeSince}
        </Typography>
      );
    }
  }
}
