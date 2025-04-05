import React from "react";
import { Space, Table, Tag } from "antd";

const columns = [
  {
    title: "Script Code",
    dataIndex: "SCRIP_CD",
    key: "SCRIP_CD",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "News Subject",
    dataIndex: "NEWSSUB",
    key: "NEWSSUB",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Date & Time",
    dataIndex: "DT_TM",
    key: "DT_TM",
    render: (text) => <p>{new Date(text).toLocaleString()}</p>,
  },
  {
    title: "Details Link",
    dataIndex: "NSURL",
    key: "NSURL",
    render: (text) => (
      <a href={text} target="_blank" rel="noopener noreferrer">
        View Details
      </a>
    ),
  },
];

const DataTable = (props) => {
  const { data } = props;

  const columnData = data.map((item) => ({
    key: item.NEWSID,
    SCRIP_CD: item.SCRIP_CD,
    NEWSSUB: item.NEWSSUB,
    DT_TM: item.DT_TM,
    NSURL: item.NSURL,
  }));

  return <Table columns={columns} dataSource={columnData} />;
};

export default DataTable;
