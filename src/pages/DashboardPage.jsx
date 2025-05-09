import { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Space,
  Input,
  Table,
  Button,
  DatePicker,
  Modal,
  Form,
  Select,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoneyCollectOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { IncomeExpenseContext } from "../context/IncomeExpenseContext";

const { TextArea } = Input;
const { Option } = Select;

const COLORS = ["#3f8600", "#cf1322"];

const DashboardPage = () => {
  const categoriesSelect = [
    { value: "maas", label: "Maaş" },
    { value: "kira", label: "Kira" },
    { value: "market", label: "Market" },
    { value: "fatura", label: "Fatura" },
    { value: "egitim", label: "Eğitim" },
    { value: "saglik", label: "Sağlık" },
    { value: "ulasim", label: "Ulaşım" },
    { value: "eglence", label: "Eğlence" },
    { value: "yatirim", label: "Yatırım" },
    { value: "hediye", label: "Hediye" },
    { value: "diger_gelir", label: "Diğer Gelir" },
    { value: "diger_gider", label: "Diğer Gider" },
  ];
  const { incomeExpenseList, updateIncomeExpense, deleteIncomeExpense } =
    useContext(IncomeExpenseContext);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [open, setOpen] = useState(false);
  const [monthlyIncomeExpenseData, setMonthlyIncomeExpenseData] = useState([]);
  const [form] = Form.useForm();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBalance, setRemainigBalance] = useState(0);
  const [incomePercent, setIncomePercent] = useState(0);
  const [expensePercent, setExpensePercent] = useState(0);

  useEffect(() => {
    const income = incomeExpenseList
      .filter((item) => item.type === "Gelir")
      .reduce((total, item) => total + Number(item.amount), 0);
    const expense = incomeExpenseList
      .filter((item) => item.type === "Gider")
      .reduce((total, item) => total + Number(item.amount), 0);
    const balance = income - expense;
    const total = income + expense;
    const incomePercent = total > 0 ? (income / total) * 100 : 0;
    const expensePercent = total > 0 ? (expense / total) * 100 : 0;

    setTotalIncome(income);
    setTotalExpense(expense);
    setRemainigBalance(balance);
    setIncomePercent(incomePercent);
    setExpensePercent(expensePercent);

    const groupMonthlyIncomeExpense = (list) => {
      const monthlyData = {};
      list.forEach((item) => {
        const date = new Date(item.date);
        const month = date.toLocaleString("default", { month: "short" });
        if (!monthlyData[month]) {
          monthlyData[month] = { month, income: 0, expense: 0 };
        }
        if (item.type === "Gelir") {
          monthlyData[month].income += Number(item.amount);
        } else if (item.type === "Gider") {
          monthlyData[month].expense += Number(item.amount);
        }
      });

      return Object.values(monthlyData).sort(
        (a, b) =>
          new Date("01-" + a.month + "-2025") -
          new Date("01-" + b.month + "-2025")
      );
    };

    const newMonthlyIncomeExpenseData =
      groupMonthlyIncomeExpense(incomeExpenseList);
    setMonthlyIncomeExpenseData(
      newMonthlyIncomeExpenseData.map((item) => ({
        ...item,
        income: item.income / 1000,
        expense: item.expense / 1000,
      }))
    );
  }, [incomeExpenseList]);

  const openModal = (record) => {
    setSelectedRecord(record);
    setOpen(true);
    form.setFieldsValue(record);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedRecord(null);
    form.resetFields();
  };

  const handleDelete = () => {
    deleteIncomeExpense(selectedRecord.id);
    setOpen(false);
    setSelectedRecord(null);
    form.resetFields();
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        updateIncomeExpense(selectedRecord.id, values);
        setOpen(false);
        setSelectedRecord(null);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleSendReport = () => {
    console.log("Rapor gönderiliyor...");
    console.log("Gelir ve Gider Verisi:", incomeExpenseList);

    alert("Gelir ve Gider bilgileriniz e-posta adresinize gönderilmiştir.");
  };

  const columns = [
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Kategoriye göre ara"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={confirm}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Ara
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Temizle
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.category.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Tarih",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            onChange={(date, dateString) =>
              setSelectedKeys(dateString ? [dateString] : [])
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={confirm}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Filtrele
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Temizle
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.date.startsWith(value),
    },
    {
      title: "Tutar",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount} TL`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Tip",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Space>
          {type === "Gelir" ? (
            <ArrowUpOutlined style={{ color: COLORS[0] }} />
          ) : (
            <ArrowDownOutlined style={{ color: COLORS[1] }} />
          )}
          {type}
        </Space>
      ),
      filters: [
        {
          text: "Gelir",
          value: "Gelir",
        },
        {
          text: "Gider",
          value: "Gider",
        },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showModal(record)}>
            Düzenle
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={24}>
        <Col md={8}>
          <Card>
            <Statistic
              title="Toplam Gelir"
              value={`${totalIncome} TL`}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<MoneyCollectOutlined />}
            />
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Statistic
              title="Toplam Gider"
              value={`${totalExpense} TL`}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Statistic
              title="Kalan Bütçe"
              value={`${remainingBalance} TL`}
              precision={2}
              valueStyle={{
                color: remainingBalance >= 0 ? "#3f8600" : "#cf1322",
              }}
              prefix={<WalletOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col lg={8}>
          <Card title="Gelir / Gider Analizi">
            <ResponsiveContainer height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Gelir", value: totalIncome, type: "Gelir" },
                    { name: "Gider", value: totalExpense, type: "Gider" },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  <Cell key={`cell-0`} fill={COLORS[0]} />
                  <Cell key={`cell-1`} fill={COLORS[1]} />
                </Pie>
                <Tooltip formatter={(value) => `${value} TL`} />
              </PieChart>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Space>
                  <span style={{ color: COLORS[0] }}>
                    <ArrowUpOutlined /> Gelir (%{incomePercent.toFixed(0)})
                  </span>
                  <span style={{ color: COLORS[1] }}>
                    <ArrowDownOutlined /> Gider (%{expensePercent.toFixed(0)})
                  </span>
                </Space>
              </div>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col lg={16}>
          <Card title="Aylık Gelir / Gider Analizi">
            <ResponsiveContainer height={250}>
              <BarChart data={monthlyIncomeExpenseData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value * 1000} TL`} />
                <Bar dataKey="income" fill={COLORS[0]} name="Gelir" />
                <Bar dataKey="expense" fill={COLORS[1]} name="Gider" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Gelir ve Gider Detayları</span>
                <Button
                  type="primary"
                  icon={<MailOutlined />}
                  onClick={handleSendReport}
                >
                  Rapor Al
                </Button>
              </div>
            }
          >
            <Table
              dataSource={incomeExpenseList}
              columns={columns.map((col) => ({
                ...col,
                onCell: (record) => ({
                  onClick: () => {
                    openModal(record);
                  },
                }),
                style: { cursor: "pointer" },
              }))}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={selectedRecord ? `${selectedRecord.type} Detayı` : "Detay"}
        visible={open}
        onCancel={closeModal}
        footer={[
          <Button key="sil" danger onClick={handleDelete}>
            Sil
          </Button>,
          <Button key="guncelle" type="primary" onClick={handleUpdate}>
            Güncelle
          </Button>,
          <Button key="iptal" onClick={closeModal}>
            İptal
          </Button>,
        ]}
      >
        {selectedRecord && (
          <Form form={form} layout="vertical" initialValues={selectedRecord}>
            <Form.Item label="Kategori" name="category">
              <Select placeholder="Kategori Seçin">
                {categoriesSelect.map((select) => (
                  <Option key={select.value} value={select.value}>
                    {select.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Tutar" name="amount">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Tip" name="type">
              <Input disabled />
            </Form.Item>

            {selectedRecord.description && (
              <Form.Item label="Açıklama" name="description">
                <TextArea rows={4} />
              </Form.Item>
            )}
            {!selectedRecord.description && (
              <p>Bu kaydın açıklaması bulunmuyor.</p>
            )}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;
