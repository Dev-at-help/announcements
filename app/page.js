// app/page.js

"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  // console.table(data);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("2025-01-25"); // default from date
  const [toDate, setToDate] = useState("2025-01-26"); // default to date
  const [fetchDataNow, setFetchDataNow] = useState(false);

  const toggleFetchDataNow = () => {
    setFetchDataNow(!fetchDataNow);
  };

  const handleDateChange = (type, value) => {
    if (type === "fromDate") {
      if (new Date(value) > new Date(toDate)) {
        window.alert("From Date must be earlier than To Date.");
        return;
      }
      setFromDate(value);
    } else if (type === "toDate") {
      if (new Date(value) < new Date(fromDate)) {
        window.alert("To Date must be later than From Date.");
        return;
      }
      setToDate(value);
    }
  };

  // Fetch data whenever fromDate or toDate changes
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `/.netlify/functions/fetchData?fromDate=${fromDate}&toDate=${toDate}`
        );
        const json = await res.json();
        setData(json.Table); // Store only the "Table" array from the response
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchDataNow]); // Re-run whenever the dates change

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // Render table with the data
  return (
    <div
      style={{
        opacity: loading ? 0.5 : 1,
        pointerEvents: loading ? "none" : "",
      }}
    >
      <h1>BSE India Data - Award of Order / Receipt of Order</h1>
      <a href="https://www.bseindia.com/corporates/ann.html" target="_blank">
        Go to BSE
      </a>
      <br />
      <br />

      {/* Date Inputs */}
      <label>
        From Date:
        <input
          type="date"
          value={fromDate}
          onChange={(e) => handleDateChange("fromDate", e.target.value)}
        />
      </label>
      <br />
      <label>
        To Date:
        <input
          type="date"
          value={toDate}
          onChange={(e) => handleDateChange("toDate", e.target.value)}
        />
      </label>
      <br />
      <button onClick={toggleFetchDataNow} disabled={loading}>
        Fetch Data
      </button>

      <br />
      <br />
      <div
        style={{
          width: "100%",
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping of content
          height: "100%",
        }}
      >
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              {/* <th>News ID</th> */}
              <th>Script Code</th>
              <th>News Subject</th>
              <th>Date & Time</th>
              <th>Details Link</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                {/* <td>{item.NEWSID}</td> */}
                <td>{item.SCRIP_CD}</td>
                <td
                  style={{
                    // width: "400px",
                    // maxWidth: "450px",
                    textWrap: "wrap",
                  }}
                >
                  {item.NEWSSUB}
                </td>
                <td>{new Date(item.DT_TM).toLocaleString()}</td>{" "}
                {/* Format the date */}
                <td>
                  <a
                    href={item.NSURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
