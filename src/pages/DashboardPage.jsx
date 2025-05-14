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
import Title from "antd/es/typography/Title";

const { TextArea } = Input;
const { Option } = Select;

const categoriesSelect = [
  { value: "Maaş", label: "Maaş" },
  { value: "Kira", label: "Kira" },
  { value: "Market", label: "Market" },
  { value: "Fatura", label: "Fatura" },
  { value: "Eğitim", label: "Eğitim" },
  { value: "Sağlık", label: "Sağlık" },
  { value: "Ulaşım", label: "Ulaşım" },
  { value: "Eğlence", label: "Eğlence" },
  { value: "Yatırım", label: "Yatırım" },
  { value: "Hediye", label: "Hediye" },
  { value: "Diğer Gelir", label: "Diğer Gelir" },
  { value: "Diğer Gider", label: "Diğer Gider" },
];

const DashboardPage = () => {
  const { incomeExpenseList, updateIncomeExpense, deleteIncomeExpense } =
    useContext(IncomeExpenseContext);

  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [monthlyIncomeExpense, setMonthlyIncomeExpense] = useState([]);
  const [form] = Form.useForm();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingBalance, setRemainigBalance] = useState(0);
  const [incomePercent, setIncomePercent] = useState(0);
  const [expensePercent, setExpensePercent] = useState(0);

  useEffect(() => {
    const income = incomeExpenseList
      .filter((item) => item.type === "Gelir")
      .reduce((sum, item) => sum + Number(item.amount), 0);
    const expense = incomeExpenseList
      .filter((item) => item.type === "Gider")
      .reduce((sum, item) => sum + Number(item.amount), 0);
    const total = income + expense;

    setTotalIncome(income);
    setTotalExpense(expense);
    setRemainigBalance(income - expense);
    setIncomePercent(total > 0 ? (income / total) * 100 : 0);
    setExpensePercent(total > 0 ? (expense / total) * 100 : 0);

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
    setMonthlyIncomeExpense(
      newMonthlyIncomeExpenseData.map((item) => ({
        ...item,
        income: item.income / 1000,
        expense: item.expense / 1000,
      }))
    );
  }, [incomeExpenseList]);

  const openModal = (item) => {
    setSelectedItem(item);
    setOpen(true);
    form.setFieldsValue(item);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const row_id = selectedItem.id;
    /* var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "delete",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://v1.nocodeapi.com/tunabozlak37/google_sheets/erDdRuTCbOPSqGHP?tabId=budget&row_id=${row_id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then(() => {
        alert("Silme işlemi başarılı");
        setOpen(false);
        form.resetFields();
      })
      .catch((error) => console.log("error", error));*/
    deleteIncomeExpense(selectedItem.id);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      /*var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "put",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          row_id: selectedItem.id,
          category: values.category,
          amount: values.amount,
          description: values.description || "",
        }),
      };

      fetch(
        "https://v1.nocodeapi.com/tunabozlak37/google_sheets/erDdRuTCbOPSqGHP?tabId=budget",
        requestOptions
      )
        .then((response) => response.text())
        .then(() => {
          alert("Güncelleme işlemi başarılı!");
          setOpen(false);
          form.resetFields();
        })
        .catch((error) => console.log("error", error));*/

      updateIncomeExpense(selectedItem.id, values);
    });
  };

  const handleSendReport = () => {
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
              setSelectedKeys(
                e.target.value ? [e.target.value.toLowerCase()] : []
              )
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
              Ara
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                setSelectedKeys([]);
                confirm({ closeDropdown: false });
              }}
              size="small"
              style={{ width: 90 }}
            >
              Temizle
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, item) =>
        item.category.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      filterDropdownProps: {
        getPopupContainer: (triggerNode) => triggerNode.parentNode,
        placement: "top",
      },
    },
    {
      title: "Tarih",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "150px" }}>
          <DatePicker
            onChange={(date, dateString) => {
              setSelectedKeys(dateString ? [dateString] : []);
              confirm();
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      onFilter: (value, item) => item.date.startsWith(value),
      filterDropdownProps: {
        getPopupContainer: (triggerNode) => triggerNode.parentNode,
        placement: "top",
      },
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
            <ArrowUpOutlined style={{ color: "#3f8600" }} />
          ) : (
            <ArrowDownOutlined style={{ color: "#cf1322" }} />
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
      onFilter: (value, item) => item.type === value,
      filterDropdownProps: {
        getPopupContainer: (triggerNode) => triggerNode.parentNode,
        placement: "top",
      },
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, item) => (
        <Space size="middle">
          <Button type="link" onClick={() => openModal(item)}>
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
                  label
                >
                  <Cell fill={"#3f8600"} />
                  <Cell fill={"#cf1322"} />
                </Pie>
                <Tooltip formatter={(value) => `${value} TL`} />
              </PieChart>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Space>
                  <span style={{ color: "#3f8600" }}>
                    <ArrowUpOutlined /> Gelir (%{incomePercent.toFixed(0)})
                  </span>
                  <span style={{ color: "#cf1322" }}>
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
              <BarChart data={monthlyIncomeExpense}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value * 1000} TL`} />
                <Bar dataKey="income" fill="#3f8600" />
                <Bar dataKey="expense" fill="#cf1322" />
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
                }}
              >
                <Title level={5}>Gelir ve Gider Detayları</Title>
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
                onCell: (item) => ({
                  onClick: () => {
                    openModal(item);
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
        title={selectedItem ? `${selectedItem.type} Detayı` : "Detay"}
        open={open}
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
        {selectedItem && (
          <Form form={form} layout="vertical" initialValues={selectedItem}>
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

            {selectedItem.description && (
              <Form.Item label="Açıklama" name="description">
                <TextArea rows={4} />
              </Form.Item>
            )}
            {!selectedItem.description && (
              <p>Bu kaydın açıklaması bulunmuyor.</p>
            )}
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;
