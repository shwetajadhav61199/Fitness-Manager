import React, { useState } from 'react';
import './App.css';

function Calendar({ appointments }) {
  return (
    <div>
      <h2>Calendar View</h2>
      {/* Your calendar implementation goes here */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Appointments</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((day) => (
            <tr key={day.date}>
              <td>{day.date}</td>
              <td>
                <ul>
                  {day.appointments.map((appointment) => (
                    <li key={appointment.id}>{appointment.clientName}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2023-12-15", clientName: "John", FirstName: 'Doe', Location: "hey" },
    { id: 2, date: "2023-12-15", clientName: "Jane ", FirstName: 'Smith', Location: "Kphb" },
    { id: 3, date: "2023-12-20", clientName: "Alice", FirstName: 'Johnson', Location: "Downtown" },
    // Add more sample data as needed
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };

  const saveAppointment = () => {
    if (editingAppointment.id) {
      // Update existing appointment
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === editingAppointment.id
            ? { ...appointment, ...editingAppointment }
            : appointment
        )
      );
    } else {
      // Add new appointment
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        { id: Date.now(), ...editingAppointment },
      ]);
    }

    setEditingAppointment(null);
  };

  const deleteAppointment = (appointment) => {
    setShowDeleteModal(true);
    setEditingAppointment(appointment);
  };

  const confirmDelete = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((apt) => apt.id !== editingAppointment.id)
    );
    setEditingAppointment(null);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEditingAppointment(null);
  };

  const generateCalendarData = () => {
    // Group appointments by date
    const groupedAppointments = appointments.reduce((acc, appointment) => {
      const date = appointment.date;
      if (!acc[date]) {
        acc[date] = { date, appointments: [] };
      }
      acc[date].appointments.push(appointment);
      return acc;
    }, {});

    // Convert the object back to an array
    const calendarData = Object.values(groupedAppointments);

    return calendarData;
  };

  return (
    <div className="App">
      <h1>Fitness Appointment Manager</h1>
      <button onClick={() => setShowCalendar(false)}>Appointments</button>
      <button onClick={() => setShowCalendar(true)}>Calendar View</button>

      {showCalendar ? (
        <Calendar appointments={generateCalendarData()} />
      ) : (
        <div>
          {/* Your table view implementation goes here */}
          {/* ... (rest of the code remains unchanged) */}
        </div>
      )}

      {/* ... (rest of the code remains unchanged) */}
    </div>
  );
}

export default App;
