import React from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Space,
  Typography,
  Input,
  Table,
  Button,
  DatePicker,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoneyCollectOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
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

const { Title } = Typography;

const COLORS = ["#3f8600", "#cf1322"];

const gelirGiderVerisi = [
  { name: "Gelir", value: 50000, type: "Gelir" },
  { name: "Gider", value: 20000, type: "Gider" },
];

const gelirZamanCizelgesiVerisi = [
  { ay: "Oca", gelir: 25 },
  { ay: "Şub", gelir: 38 },
  { ay: "Mar", gelir: 35 },
  { ay: "Nis", gelir: 42 },
  { ay: "May", gelir: 48 },
  { ay: "Haz", gelir: 40 },
];

const birlesikListeVerisi = [
  {
    id: "1",
    category: "Kira",
    amount: 10000,
    type: "Gider",
    date: "2025-05-01",
  },
  {
    id: "2",
    category: "Market",
    amount: 5000,
    type: "Gider",
    date: "2025-05-05",
  },
  {
    id: "3",
    category: "Fatura",
    amount: 5000,
    type: "Gider",
    date: "2025-05-10",
  },
  {
    id: "4",
    category: "Maaş",
    amount: 20000,
    type: "Gelir",
    date: "2025-05-15",
  },
  {
    id: "5",
    category: "Serbest Meslek",
    amount: 15000,
    type: "Gelir",
    date: "2025-05-20",
  },
  {
    id: "6",
    category: "Yatırım",
    amount: 15000,
    type: "Gelir",
    date: "2025-05-25",
  },
  {
    id: "7",
    category: "Hediye",
    amount: 15000,
    type: "Gelir",
    date: "2025-05-30",
  },
  {
    id: "8",
    category: "Maaş",
    amount: 15000,
    type: "Gelir",
    date: "2025-06-01",
  },
];
const sutunlar = [
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
];

const DashboardPage = () => {
  const toplamGelir = gelirGiderVerisi[0].value;
  const toplamGider = gelirGiderVerisi[1].value;
  const kalanBakiye = toplamGelir - toplamGider;
  const gelirYuzdesi = (toplamGelir / (toplamGelir + toplamGider)) * 100;
  const giderYuzdesi = (toplamGider / (toplamGelir + toplamGider)) * 100;

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Toplam Gelir"
              value={`${toplamGelir} TL`}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<MoneyCollectOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Toplam Gider"
              value={`${toplamGider} TL`}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Kalan Bütçe"
              value={`${kalanBakiye} TL`}
              precision={2}
              valueStyle={{ color: kalanBakiye >= 0 ? "#3f8600" : "#cf1322" }}
              prefix={<WalletOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={12} lg={8}>
          <Card title="Gelir / Gider Analizi">
            <ResponsiveContainer height={250}>
              <PieChart>
                <Pie
                  data={gelirGiderVerisi}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {gelirGiderVerisi.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} TL`} />
              </PieChart>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Space>
                  <span style={{ color: COLORS[0] }}>
                    <ArrowUpOutlined /> Gelir (%{gelirYuzdesi.toFixed(0)})
                  </span>
                  <span style={{ color: COLORS[1] }}>
                    <ArrowDownOutlined /> Gider (%{giderYuzdesi.toFixed(0)})
                  </span>
                </Space>
              </div>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <Card title="Aylık Gelir Analizi">
            <ResponsiveContainer height={250}>
              <BarChart data={gelirZamanCizelgesiVerisi}>
                <XAxis dataKey="ay" />
                <YAxis />
                <Tooltip formatter={(value) => `${value * 1000} TL`} />
                <Bar dataKey="gelir" fill={COLORS[0]} name="Gelir" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Gelir ve Gider Detayları">
            <Table dataSource={birlesikListeVerisi} columns={sutunlar} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
