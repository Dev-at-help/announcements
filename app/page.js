// app/page.js

'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('2025-01-25'); // default from date
  const [toDate, setToDate] = useState('2025-01-26'); // default to date

  // Fetch data whenever fromDate or toDate changes
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`/.netlify/functions/fetchData?fromDate=${fromDate}&toDate=${toDate}`);
        const json = await res.json();
        setData(json.Table); // Store only the "Table" array from the response
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fromDate, toDate]); // Re-run whenever the dates change

  const handleDateChange = () => {
    // Trigger fetch when date range changes
    setLoading(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render table with the data
  return (
    <div>
      <h1>BSE India Data - Award of Order / Receipt of Order</h1>
      <a href="https://www.bseindia.com/corporates/ann.html" target="_blank">Go to BSE</a>
      <br />
      <br />

      {/* Date Inputs */}
      <label>
        From Date:
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </label>
      <label>
        To Date:
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </label>
      <button onClick={handleDateChange}>Fetch Data</button>

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>News ID</th>
            <th>Script Code</th>
            <th>News Subject</th>
            <th>Date & Time</th>
            <th>Category</th>
            <th>Details Link</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.NEWSID}</td>
              <td>{item.SCRIP_CD}</td>
              <td>{item.NEWSSUB}</td>
              <td>{new Date(item.DT_TM).toLocaleString()}</td> {/* Format the date */}
              <td>{item.CATEGORYNAME}</td>
              <td>
                <a href={item.NURL} target="_blank" rel="noopener noreferrer">
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
