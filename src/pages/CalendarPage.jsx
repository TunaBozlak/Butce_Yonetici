import React, { useState, useEffect } from "react";
import { Calendar, Badge, Modal, List } from "antd";

const CalendarPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyTransactions, setDailyTransactions] = useState([]);

  useEffect(() => {
    const fakeTransactions = [
      {
        id: "1",
        type: "gelir",
        amount: 100,
        category: "Maaş",
        date: new Date("2025-05-10"),
        description: "Mayıs maaşı",
      },
      {
        id: "2",
        type: "gider",
        amount: 30,
        category: "Market",
        date: new Date("2025-05-10"),
        description: "Haftalık alışveriş",
      },
      {
        id: "3",
        type: "gelir",
        amount: 50,
        category: "Diğer",
        date: new Date("2025-05-12"),
        description: "Hediye",
      },
      {
        id: "4",
        type: "gider",
        amount: 15,
        category: "Ulaşım",
        date: new Date("2025-05-15"),
        description: "Otobüs bileti",
      },
      {
        id: "5",
        type: "gelir",
        amount: 200,
        category: "Proje",
        date: new Date("2025-05-20"),
        description: "Web projesi ödemesi",
      },
      {
        id: "6",
        type: "gider",
        amount: 60,
        category: "Fatura",
        date: new Date("2025-05-20"),
        description: "Elektrik faturası",
      },
      {
        id: "7",
        type: "gider",
        amount: 25,
        category: "Kafeterya",
        date: new Date("2025-05-20"),
        description: "Öğle yemeği",
      },
    ];
    setTransactions(fakeTransactions);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getListData = (value) => {
    const formattedValue = formatDate(value.toDate());
    return transactions.filter(
      (item) => formatDate(item.date) === formattedValue
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status={item.type === "gelir" ? "success" : "error"}
              text={`${item.type === "gelir" ? "+" : "-"}${item.amount} TL`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value) => {
    setSelectedDate(value.toDate());
    const formattedValue = formatDate(value.toDate());
    setDailyTransactions(
      transactions.filter((item) => formatDate(item.date) === formattedValue)
    );
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
              <span style={{ color: item.type === "gelir" ? "green" : "red" }}>
                {item.type === "gelir" ? "+" : "-"}
              </span>
              {item.amount} TL - {item.category} ({formatTime(item.date)}) -{" "}
              {item.description}
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default CalendarPage;
