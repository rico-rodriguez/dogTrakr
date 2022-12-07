import { React, useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { fToNow } from '../../../utils/formatTime';

export default function TimeSince({ activityType }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/record`)
      .then((response) => response.json())
      .then((usefulData) => {
        console.log(usefulData);
        setData(usefulData);
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`);
      });
  }, []);
  console.log(data);
  // Check if data is defined before accessing its properties
  if (data && data.length) {
    for (let i = 0; i < data.length; i += 1) {
      const reverseData = data.reverse();
      if (reverseData[i].activity === { activityType }.activityType) {
        // const lastActivity = data[data.length - 1];
        const lastActivity = reverseData[i];
        const lastActivityTime = lastActivity.time;
        const lastActivityDate = lastActivity.date;
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
        console.log(timeSince);
        return (
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {timeSince}
          </Typography>
        );
      }
    }
  }
}
