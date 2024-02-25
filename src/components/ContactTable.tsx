"use client";

import { Table, Typography, notification } from "antd";
import { useState } from "react";
import EditableCell from "./EditableCell";
import { Contact } from "@/types/contact";

interface ContactTableProps {
  items: Contact[];
}

const ContactTable = ({ items }: ContactTableProps) => {
  const [dataSource, setDataSource] = useState(items);
  const [isLoading, setIsLoading] = useState(false);

  const [notiApi, contextHolder] = notification.useNotification();

  const columns = ["FirstName", "LastName", "Email", "Phone"].map((it) => ({
    title: it,
    dataIndex: it,
    editable: true,
    onCell: (record: Contact) => ({
      record,
      title: it,
      dataIndex: it,
      editable: true,
      handleSave,
    }),
  }));

  const handleSave = async (
    row: Contact,
    dataIndex: keyof Contact,
    newValue: string
  ) => {
    const sourceIndex = dataSource.findIndex((it) => it.Id === row.Id);
    if (sourceIndex === -1 || !newValue || newValue === row[dataIndex]) return;

    setIsLoading(true);

    const originalData = dataSource[sourceIndex];
    dataSource[sourceIndex] = { ...originalData, [dataIndex]: newValue };
    setDataSource([...dataSource]);

    const updateData = {
      [dataIndex]: newValue,
    };

    await fetch(`/api/salesforce/contact/${row.Id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    }).then((res) => {
      setIsLoading(false);
      if (!res.ok) {
        // reset data
        dataSource[sourceIndex] = originalData;
        setDataSource([...dataSource]);
        notiApi.error({
          message: `Error!!`,
          description: "Update account error",
          placement: "topRight",
        });
      } else {
        notiApi.success({
          message: `Success!!`,
          description: "Update account successfully",
          placement: "topRight",
        });
      }
    });
  };

  return (
    <div>
      {contextHolder}
      <Typography.Title
        level={2}
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        Contact
      </Typography.Title>
      <Table
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};

export default ContactTable;
