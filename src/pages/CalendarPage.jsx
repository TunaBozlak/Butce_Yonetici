import { useState, useContext } from "react";
import { Calendar, Badge, Modal, List, Card, Typography, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { IncomeExpenseContext } from "../context/IncomeExpenseContext";

const { Title, Text } = Typography;

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [dailyIncomeExpense, setDailyIncomeExpense] = useState([]);
  const [openReport, setOpenReport] = useState(false);
  const { incomeExpenseList } = useContext(IncomeExpenseContext);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getListData = (item) => {
    const formattedItem = formatDate(item.toDate());
    return incomeExpenseList.filter(
      (item) => formatDate(new Date(item.date)) === formattedItem
    );
  };

  const cellRender = (item) => {
    const listData = getListData(item) || [];
    return (
      <ul style={{ listStyleType: "none" }}>
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

  const openModal = (item) => {
    const selectedDates = item.toDate();
    setSelectedDate(selectedDates);
    const formattedItem = formatDate(selectedDates);
    const dailyData = incomeExpenseList.filter(
      (item) => formatDate(new Date(item.date)) === formattedItem
    );
    setDailyIncomeExpense(dailyData);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const openReportModal = () => {
    setOpenReport(true);
  };
  const closeReportModal = () => {
    setOpenReport(false);
  };

  const blockedDate = (now) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return now < today;
  };

  return (
    <div>
      <Button type="primary" icon={<MailOutlined />} onClick={openReportModal}>
        Rapor Al
      </Button>
      <Calendar
        cellRender={cellRender}
        onSelect={openModal}
        disabledDate={blockedDate}
      />

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
              <Card
                style={{
                  width: "100%",
                  border: `2px solid ${
                    item.type === "Gelir" ? "#3f8600" : "#cf1322"
                  }`,
                }}
                title={
                  <Title level={5}>
                    {item.type === "Gelir" ? "Gelir" : "Gider"}
                  </Title>
                }
              >
                <div>
                  <Text strong>Kategori: </Text>
                  <Text>{item.category}</Text>
                </div>

                <div>
                  <Text strong>Tutar: </Text>
                  <Text>{item.amount} TL</Text>
                </div>

                {item.description && (
                  <div>
                    <Text strong>Açıklama: </Text>
                    <Text>{item.description}</Text>
                  </div>
                )}
              </Card>
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        title="Rapor Gönderildi"
        open={openReport}
        onOk={closeReportModal}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <span>Takvim bilgileri e-posta adresinize gönderilmiştir.</span>
      </Modal>
    </div>
  );
};

export default CalendarPage;
