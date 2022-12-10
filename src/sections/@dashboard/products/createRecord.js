import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import React, { useState } from 'react';

const time = new Date();
const yyyymmdd = new Date().toLocaleDateString('en-CA');
console.log(yyyymmdd);
const timeString = time.toTimeString().split(' ')[0].slice(0, 5);

export default function Create({ handleClose }) {
  const [value, onChange] = useState();
  const [date, setDate] = useState();
  const [form, setForm] = useState({
    date: { date }.date,
    time: { value }.value,
    activity: 'Walk',
  });

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    handleClose();
    updateForm({ date: form.date, time: form.time, activity: form.activity });
    if (form.date === undefined || form.time === undefined || form.activity === undefined) {
      console.log(form.date);
      console.log(form.time);
      window.alert('Please enter a date and time');
      e.preventDefault();
      return;
    }

    // When a post request is sent to the create url, we'll add a new record to the database.
    const LogNewActivity = { ...form };

    await fetch('http://localhost:3000/record/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(LogNewActivity),
    }).catch((error) => {
      window.alert(error);
    });

    setForm({ date: '', time: '', activity: '' });
    // reload table without refreshing page

    // navigate('/dashboard/products');
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Add New Activity</h3>
      <form name="formgrp" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            className="form-control"
            id="date"
            onChange={(e) => updateForm({ date: e.target.value }) && setDate(e.target.value)}
            value={date}
            defaultValue={yyyymmdd}
          />
          <br />
          <label htmlFor="time">Time: </label>
          <input
            type="time"
            className="form-control"
            id="time"
            onChange={(e) => updateForm({ time: e.target.value }) && onChange(e.target.value)}
            value={value}
            defaultValue={timeString}
          />
          <br />
          <FormControl>
            <RadioGroup aria-labelledby="frm-grp" defaultValue="Walk" name="radio-buttons-group">
              <FormControlLabel
                value="Walk"
                control={<Radio />}
                label="Walk"
                onChange={(e) => updateForm({ activity: e.target.value })}
              />
              <FormControlLabel
                value="Meal"
                control={<Radio />}
                label="Meal"
                onChange={(e) => updateForm({ activity: e.target.value })}
              />
              <FormControlLabel
                value="Medication"
                control={<Radio />}
                label="Medication"
                onChange={(e) => updateForm({ activity: e.target.value })}
              />
              <FormControlLabel
                value="Potty"
                control={<Radio />}
                label="Potty"
                onChange={(e) => updateForm({ activity: e.target.value })}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="form-group">
          <Button type="submit" value="Create person" className="btn btn-primary">
            Add Activity
          </Button>
        </div>
      </form>
    </div>
  );
}
