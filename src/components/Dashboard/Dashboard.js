// src/components/Dashboard/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  // Dummy entries for demonstration
  const entries = [
    { id: 1, billNo: 'B001', title: 'Entry 1', date: '2022-01-30', recipient: 'John Doe', amount: 100.00 },
    { id: 2, billNo: 'B002', title: 'Entry 2', date: '2022-01-29', recipient: 'Jane Doe', amount: 150.00 },
    // Add more entries as needed
  ];

  return (
    <div>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-actions">
          <button className="new-entry-button">New Entry</button>
          <input type="text" className="search-input" placeholder="Search..." />
          <div className="total-entries">Total Entries: {entries.length}</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Profile Picture:</strong> <img src={user.picture} alt="Profile" />
        </div>

        {/* Table to display entries */}
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Bill No</th>
              <th>Title</th>
              <th>Date</th>
              <th>Recipient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.billNo}</td>
                <td>{entry.title}</td>
                <td>{entry.date}</td>
                <td>{entry.recipient}</td>
                <td>{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
