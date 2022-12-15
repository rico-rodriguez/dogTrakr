import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from '@mui/material';

import { Typography, Grid } from '@mui/material';
import { display, Stack } from '@mui/system';

// import moment from 'moment';

const RecordCard = ({ record }) => {
  const [date, setDate] = useState(record.date);
  const [time, setTime] = useState(record.time);
  const [activity, setActivity] = useState(record.activity);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleSave = () => {
    // Update the record in the database
    axios
      .put(`http://localhost:3000/record/${record._id}`, {
        id: record.id,
        date,
        time,
        activity,
      })
      .then((response) => {
        // Check for any errors in the response
        if (response.error) {
          console.error('There was an error updating the record:', response.error);
        } else {
          console.log('Record updated successfully');
        }
      });
  };
  const handleDelete = () => {
    // Delete the record in the database
    axios
      .delete(`http://localhost:3000/record/${record._id}`, {
        id: record.id,
        date,
        time,
        activity,
      })
      .then((response) => {
        // Check for any errors in the response
        if (response.error) {
          console.error('There was an error deleting the record:', response.error);
        } else {
          console.log('Record deleted successfully');
        }
      });
  };
  const customBackgroundColor =
    record.activity === 'Walk'
      ? '#ddeefc'
      : record.activity === 'Potty'
      ? '#dcf4fe'
      : record.activity === 'Meal'
      ? '#fdf7db'
      : '#fdece3';
  return (
    <>
      <Card
        sx={{
          margin: '10px',
          width: '100%',
          // height: '150px',
          backgroundColor: customBackgroundColor,
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: '1 1 auto',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '10px',
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="activity-select-label">Activity</InputLabel>
              <Select
                labelId="activity-select-label"
                id="activity-select"
                value={activity}
                label="Activity"
                onChange={handleActivityChange}
              >
                <MenuItem value="">Select an activity</MenuItem>
                <MenuItem value="Potty">Potty</MenuItem>
                <MenuItem value="Meal">Meal</MenuItem>
                <MenuItem value="Medication">Medication</MenuItem>
                <MenuItem value="Walk">Walk</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            type="date"
            value={date}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="time"
            value={time}
            onChange={handleTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

          <span>
            <Button variant="outlined" color="success" onClick={handleSave}>
              Save
            </Button>
            <span> </span>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </span>
        </CardContent>
      </Card>
    </>
  );
};

const RecordList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Get the records from the database
    axios.get('http://localhost:3000/record/').then((response) => {
      setRecords(response.data);
    });

    // Set a timer to refresh the data every 500 milliseconds
    const timer = setInterval(() => {
      // Get the records from the database
      axios.get('http://localhost:3000/record/').then((response) => {
        setRecords(response.data);
      });
    }, 500);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);
  // Reverse the records array
  const reversedRecords = records.reverse();

  return (
    <Grid container>
      <Grid item xs={12} s={6}>
        {reversedRecords.map((record, index) =>
          index % 2 === 0 ? <RecordCard key={record._id} record={record} /> : null
        )}
      </Grid>
      <Grid item xs={12} s={6}>
        {reversedRecords.map((record, index) =>
          index % 2 === 1 ? <RecordCard key={record._id} record={record} /> : null
        )}
      </Grid>
    </Grid>
  );
};

export default RecordList;
