// app/page.js

"use client";

import { useState, useEffect } from "react";
import DataTable from "./Components/DataTable";
import { Button, DatePicker } from "antd";
import { dummyData } from "@/constants";
import dayjs from "dayjs";

export default function Home() {
  const { RangePicker } = DatePicker;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
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

  const onDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const adjustedStart = start.endOf("day");
      const adjustedEnd = end.endOf("day");

      setFromDate(adjustedStart.format("YYYY-MM-DD"));
      setToDate(adjustedEnd.format("YYYY-MM-DD"));
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
        padding: "20px",
      }}
    >
      <h1>BSE India Data - Award of Order / Receipt of Order</h1>
      <br />
      <a href="https://www.bseindia.com/corporates/ann.html" target="_blank">
        Go to BSE
      </a>

      <br />
      <br />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <RangePicker 
        value={[dayjs(fromDate), dayjs(toDate)]}
        maxDate={dayjs().startOf("day")} 
        onChange={onDateChange} 
        />
        <Button onClick={toggleFetchDataNow} name="Fetch Data">
          Fetch Data
        </Button>
      </div>

      <br />

      <div
        style={{
          width: "100%",
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping of content
          height: "100%",
        }}
      >
        <table border="1" cellPadding="10" style={{ display: "none" }}>
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
        <DataTable data={data} />
      </div>
    </div>
  );
}
