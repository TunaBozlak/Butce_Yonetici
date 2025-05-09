import { useState, useContext } from "react";
import { Calendar, Badge, Modal, List } from "antd";
import { IncomeExpenseContext } from "../context/IncomeExpenseContext";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [dailyIncomeExpense, setDailyIncomeExpense] = useState([]);
  const { incomeExpenseList } = useContext(IncomeExpenseContext);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getListData = (value) => {
    const formattedValue = formatDate(value.toDate());
    return incomeExpenseList.filter(
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

  const openModal = (value) => {
    const selectedDates = value.toDate();
    setSelectedDate(selectedDates);
    const formattedValue = formatDate(selectedDates);
    const dailyData = incomeExpenseList.filter(
      (item) => formatDate(new Date(item.date)) === formattedValue
    );
    setDailyIncomeExpense(dailyData);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} onSelect={openModal} />

      <Modal
        title={
          selectedDate
            ? `${String(selectedDate.getDate()).padStart(2, "0")}.${String(
                selectedDate.getMonth() + 1
              ).padStart(2, "0")}.${selectedDate.getFullYear()} İşlemleri`
            : ""
        }
        footer={null}
        open={open}
        onCancel={closeModal}
      >
        <List
          dataSource={dailyIncomeExpense}
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
