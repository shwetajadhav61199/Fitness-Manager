import React, { useState } from 'react';
import './App.css';
function Calendar({ appointments }) {
  return (
    <div>
      <h2>Calendar View</h2>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{appointment.clientName}</td>
              <td>{appointment.FirstName}</td>
              <td>{appointment.Location}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function App() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: "2023-12-15", clientName: "John" ,FirstName:'Doe',Location:"hey"},
    { id: 2, date: "2023-12-20", clientName: "Jane ",FirstName:'Smith',Location:"Kphb" },
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

  return (
    <div className="App">
      <h1>Fitness Appointment Manager</h1>
      <button onClick={() => setShowCalendar(false)}>Appointments</button>
      <button onClick={() => setShowCalendar(true)}>Calendar View</button>

      {showCalendar ? (
        <Calendar appointments={appointments} />
      ): (
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    {editingAppointment && editingAppointment.id === appointment.id ? (
                      <input
                      type="datetime-local"
                        value={editingAppointment.date}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                    ) : (
                      appointment.date
                    )}
                  </td>
                  <td>
                    {editingAppointment && editingAppointment.id === appointment.id ? (
                      <input
                        type="text"
                        value={editingAppointment.clientName}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            clientName: e.target.value,
                          })
                        }
                        required
                      />
                    ) : (
                      appointment.clientName
                    )}
                  </td>
                  <td>
                    {editingAppointment && editingAppointment.id === appointment.id ? (
                      <input
                        type="text"
                        value={editingAppointment.FirstName}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            FirstName: e.target.value,
                          })
                        }
                        required
                      />
                    ) : (
                      appointment.FirstName
                    )}
                  </td>
                  <td>
                    {editingAppointment && editingAppointment.id === appointment.id ? (
                      <input
                        type="text"
                        value={editingAppointment.Location}
                        onChange={(e) =>
                          setEditingAppointment({
                            ...editingAppointment,
                            Location: e.target.value,
                          })
                        }
                        required
                      />
                    ) : (
                      appointment.Location
                    )}
                  </td>
                  

                  <td>
                    
                    {editingAppointment && editingAppointment.id === appointment.id ? (
                      <>
                        <button onClick={saveAppointment}>Save</button>
                        <button onClick={() => setEditingAppointment(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => toggleEdit(appointment)}>Edit</button>
                        <button onClick={() => deleteAppointment(appointment)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showDeleteModal && (
  <div className="modal">
    <div className="modal-content-container">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this appointment?</p>
      <div className="modal-button-container">
        <button onClick={confirmDelete}>Yes </button>
        <button onClick={cancelDelete}>No</button>
      </div>
    </div>
  </div>
)}

          {editingAppointment && !editingAppointment.id && (
            <tr>
              <td>
                <input
                 type="datetime-local"
                  value={editingAppointment.date}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      date: e.target.value,
                    })
                  }
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editingAppointment.clientName}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      clientName: e.target.value,
                    })
                  }
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editingAppointment.FirstName}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      FirstName: e.target.value,
                    })
                  }
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editingAppointment.Location}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      Location: e.target.value,
                    })
                  }
                  required
                />
              </td>
              <td>
                <button onClick={saveAppointment}>Save</button>
                <button onClick={() => setEditingAppointment(null)}>Cancel</button>
              </td>
            </tr>
          )}

          <button onClick={() => setEditingAppointment({ date: "", clientName: "" })}>
            Add Appointment
          </button>
        </div>
      )}
      
    </div>
  );
}

export default App;
