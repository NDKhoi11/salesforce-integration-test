"use client";

import { Table, Typography, notification } from "antd";
import {
  useQuerySObjects,
  useUpdateQuerySObjects,
} from "../apis/salesforce/hooks";
import { Contact } from "../apis/salesforce/types";
import EditableCell from "./EditableCell";

const query = "SELECT+Id,FirstName,LastName,Email,Phone+FROM+Contact+LIMIT+10";

const ContactTable = () => {
  const { data, isLoading } = useQuerySObjects<Contact>(query);
  const records = data?.records || [];

  const { mutate, isPending } = useUpdateQuerySObjects();

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
    const updateData = {
      [dataIndex]: newValue,
    };

    mutate(
      { objectName: "contact", id: row.Id, payload: updateData },
      {
        onSuccess: () => {
          notiApi.success({
            message: `Success!!`,
            description: "Update account successfully",
            placement: "topRight",
          });
        },
        onError: () => {
          notiApi.error({
            message: `Error!!`,
            description: "Update account error",
            placement: "topRight",
          });
        },
      }
    );
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
        dataSource={records}
        columns={columns}
        pagination={false}
        loading={isPending || isLoading}
        rowKey={(it) => it.Id}
      />
    </div>
  );
};

export default ContactTable;
