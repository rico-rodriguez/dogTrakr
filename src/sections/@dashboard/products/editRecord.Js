import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

export default function Edit() {
  const [form, setForm] = useState({
    time: '',
    activity: '',
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate('/');
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      time: form.time,
      activity: form.activity,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    navigate('/');
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position: </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="activity"
              id="walk"
              value="Intern"
              checked={form.activity === 'walk'}
              onChange={(e) => updateForm({ activity: e.target.value })}
            />
            <label htmlFor="walk" className="form-check-label">
              Walk
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="activity"
              id="meal"
              value="Meal"
              checked={form.activity === 'Meal'}
              onChange={(e) => updateForm({ activity: e.target.value })}
            />
            <label htmlFor="meal" className="form-check-label">
              Meal
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="activity"
              id="medicine"
              value="Medicine"
              checked={form.activity === 'Medicine'}
              onChange={(e) => updateForm({ activity: e.target.value })}
            />
            <label htmlFor="medicine" className="form-check-label">
              Medicine
            </label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input type="submit" value="Update Record" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
