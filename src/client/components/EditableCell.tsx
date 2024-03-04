"use client";

import { useEffect, useRef, useState } from "react";
import { Input, InputRef } from "antd";

interface EditableCellProps<T = Record<string, any>> {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof T;
  record: T;
  handleSave: (record: T, dataIndex: keyof T, newValue: string) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [dataIndex, editing, record]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const saveValue = () => {
    const value = inputRef.current?.input?.value || "";
    toggleEdit();
    handleSave(record, dataIndex, value.trim());
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Input
        ref={inputRef}
        defaultValue={record[dataIndex]}
        onPressEnter={saveValue}
        onBlur={saveValue}
      />
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
