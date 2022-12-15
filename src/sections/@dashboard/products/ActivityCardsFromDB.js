import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button } from '@mui/material';
import { Container, Typography, Grid } from '@mui/material';

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

  return (
    <>
      <Card>
        <CardContent>
          <input type="date" value={date} onChange={handleDateChange} />
          <input type="time" value={time} onChange={handleTimeChange} />
          <input type="text" value={activity} onChange={handleActivityChange} />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleDelete}>Delete</Button>
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
    <div className="record-list">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          {reversedRecords.map((record, index) =>
            index % 2 === 0 ? <RecordCard key={record._id} record={record} /> : null
          )}
        </Grid>
        <Grid item xs={6}>
          {reversedRecords.map((record, index) =>
            index % 2 === 1 ? <RecordCard key={record._id} record={record} /> : null
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RecordList;
