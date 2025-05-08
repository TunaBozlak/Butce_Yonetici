import React, { useState, useEffect, useContext } from "react";
import { Calendar, Badge, Modal, List } from "antd";
import { IncomeExpenseContext } from "../context/IncomeExpenseContext";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyTransactions, setDailyTransactions] = useState([]);
  const { gelirGiderListesi } = useContext(IncomeExpenseContext);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getListData = (value) => {
    const formattedValue = formatDate(value.toDate());
    return gelirGiderListesi.filter(
      (item) => formatDate(new Date(item.date)) === formattedValue
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value) || [];
    return (
      <ul>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status={item.type === "Gelir" ? "success" : "error"}
              text={`${item.type === "Gelir" ? "+" : "-"}${item.amount} TL`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value) => {
    const selectedDateJS = value.toDate();
    setSelectedDate(selectedDateJS);
    const formattedValue = formatDate(selectedDateJS);
    const dailyData = gelirGiderListesi.filter(
      (item) => formatDate(new Date(item.date)) === formattedValue
    );
    setDailyTransactions(dailyData);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />

      <Modal
        title={
          selectedDate
            ? `${String(selectedDate.getDate()).padStart(2, "0")}.${String(
                selectedDate.getMonth() + 1
              ).padStart(2, "0")}.${selectedDate.getFullYear()} İşlemleri`
            : ""
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <List
          dataSource={dailyTransactions}
          renderItem={(item) => (
            <List.Item>
              <span style={{ color: item.type === "Gelir" ? "green" : "red" }}>
                {item.type === "Gelir" ? "+" : "-"}
              </span>
              {item.amount} TL - {item.category} - {item.description}
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default CalendarPage;
