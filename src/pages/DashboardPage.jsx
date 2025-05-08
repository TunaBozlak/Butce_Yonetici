import React, { useContext, useEffect, useState } from "react";
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
import "antd/dist/reset.css";
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
  const kategoriSecenekleri = [
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
  const { gelirGiderListesi, updateGelirGider, deleteGelirGider } =
    useContext(IncomeExpenseContext);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [aylikGelirGiderVerisi, setAylikGelirGiderVerisi] = useState([]);
  const [form] = Form.useForm();
  const [toplamGelir, setToplamGelir] = useState(0);
  const [toplamGider, setToplamGider] = useState(0);
  const [kalanBakiye, setKalanBakiye] = useState(0);
  const [gelirYuzdesi, setGelirYuzdesi] = useState(0);
  const [giderYuzdesi, setGiderYuzdesi] = useState(0);

  useEffect(() => {
    const gelir = gelirGiderListesi
      .filter((item) => item.type === "Gelir")
      .reduce((toplam, item) => toplam + Number(item.amount), 0);
    const gider = gelirGiderListesi
      .filter((item) => item.type === "Gider")
      .reduce((toplam, item) => toplam + Number(item.amount), 0);
    const bakiye = gelir - gider;
    const toplam = gelir + gider;
    const gelirYuzde = toplam > 0 ? (gelir / toplam) * 100 : 0;
    const giderYuzde = toplam > 0 ? (gider / toplam) * 100 : 0;

    setToplamGelir(gelir);
    setToplamGider(gider);
    setKalanBakiye(bakiye);
    setGelirYuzdesi(gelirYuzde);
    setGiderYuzdesi(giderYuzde);

    const gruplaAylikGelirGider = (liste) => {
      const aylikVeri = {};
      liste.forEach((item) => {
        const tarih = new Date(item.date);
        const ay = tarih.toLocaleString("default", { month: "short" });
        if (!aylikVeri[ay]) {
          aylikVeri[ay] = { ay, gelir: 0, gider: 0 };
        }
        if (item.type === "Gelir") {
          aylikVeri[ay].gelir += Number(item.amount);
        } else if (item.type === "Gider") {
          aylikVeri[ay].gider += Number(item.amount);
        }
      });

      return Object.values(aylikVeri).sort(
        (a, b) =>
          new Date("01-" + a.ay + "-2025") - new Date("01-" + b.ay + "-2025")
      );
    };
    const yeniAylikGelirGiderVerisi = gruplaAylikGelirGider(gelirGiderListesi);
    setAylikGelirGiderVerisi(
      yeniAylikGelirGiderVerisi.map((item) => ({
        ...item,
        gelir: item.gelir / 1000,
        gider: item.gider / 1000,
      }))
    );
  }, [gelirGiderListesi]);

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    form.resetFields();
  };

  const handleDelete = () => {
    deleteGelirGider(selectedRecord.id);
    setIsModalVisible(false);
    setSelectedRecord(null);
    form.resetFields();
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        updateGelirGider(selectedRecord.id, values);
        setIsModalVisible(false);
        setSelectedRecord(null);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleSendReport = () => {
    console.log("Rapor gönderiliyor...");
    console.log("Gelir ve Gider Verisi:", gelirGiderListesi);

    alert("Gelir ve Gider bilgileriniz e-posta adresinize gönderilmiştir.");
  };

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
                  data={[
                    { name: "Gelir", value: toplamGelir, type: "Gelir" },
                    { name: "Gider", value: toplamGider, type: "Gider" },
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
          <Card title="Aylık Gelir / Gider Analizi">
            <ResponsiveContainer height={250}>
              <BarChart data={aylikGelirGiderVerisi}>
                <XAxis dataKey="ay" />
                <YAxis />
                <Tooltip formatter={(value) => `${value * 1000} TL`} />
                <Bar dataKey="gelir" fill={COLORS[0]} name="Gelir" />
                <Bar dataKey="gider" fill={COLORS[1]} name="Gider" />
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
              dataSource={gelirGiderListesi}
              columns={sutunlar.map((col) => ({
                ...col,
                onCell: (record) => ({
                  onClick: () => {
                    showModal(record);
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
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="sil" danger onClick={handleDelete}>
            Sil
          </Button>,
          <Button key="guncelle" type="primary" onClick={handleUpdate}>
            Güncelle
          </Button>,
          <Button key="iptal" onClick={handleCancel}>
            İptal
          </Button>,
        ]}
      >
        {selectedRecord && (
          <Form form={form} layout="vertical" initialValues={selectedRecord}>
            <Form.Item label="Kategori" name="category">
              <Select placeholder="Kategori Seçin">
                {kategoriSecenekleri.map((secenek) => (
                  <Option key={secenek.value} value={secenek.value}>
                    {secenek.label}
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
