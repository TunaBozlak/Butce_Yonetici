import React, { useContext, useState } from "react";
import {
  Card,
  Form,
  Segmented,
  InputNumber,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Statistic,
  List,
  Avatar,
  Row,
  Col,
  Popover,
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { IncomeExpenseContext } from "../context/IncomeExpenseContext";

const { Option } = Select;

const IncomeExpensePage = () => {
  const [form] = Form.useForm();
  const { addGelirGider, gelirGiderListesi } = useContext(IncomeExpenseContext);
  const [type, setType] = useState("gelir");
  const [activePopoverId, setActivePopoverId] = useState(null);

  const onFinish = (values) => {
    const yeniKayit = {
      ...values,
      amount: Number(values.amount),
      date: values.date.format("YYYY-MM-DD"),
      type: type === "gelir" ? "Gelir" : "Gider",
    };
    addGelirGider(yeniKayit);
    form.resetFields();
    setType("");
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handlePopoverVisibleChange = (visible, itemId) => {
    setActivePopoverId(visible ? itemId : null);
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Yeni Gelir / Gider Ekle" bordered={false}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="İşlem Tipi">
                <Segmented
                  options={[
                    { label: "Gelir", value: "gelir" },
                    { label: "Gider", value: "gider" },
                  ]}
                  value={type}
                  onChange={handleTypeChange}
                />
              </Form.Item>

              <Space>
                <Form.Item
                  name="amount"
                  label="Miktar"
                  rules={[
                    { required: true, message: "Lütfen miktarı giriniz!" },
                  ]}
                >
                  <InputNumber
                    prefix={type === "gider" ? "-" : "+"}
                    style={{ width: "150px" }}
                    formatter={(value) => `${value} TL`}
                    parser={(value) => value.replace(" TL", "")}
                  />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Kategori"
                  rules={[
                    { required: true, message: "Lütfen bir kategori seçiniz!" },
                  ]}
                >
                  <Select
                    placeholder="Kategori seçiniz"
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "200px" }}
                  >
                    <Option value="maas">Maaş</Option>
                    <Option value="kira">Kira</Option>
                    <Option value="market">Market</Option>
                    <Option value="fatura">Fatura</Option>
                    <Option value="egitim">Eğitim</Option>
                    <Option value="saglik">Sağlık</Option>
                    <Option value="ulasim">Ulaşım</Option>
                    <Option value="eglence">Eglence</Option>
                    <Option value="yatirim">Yatirim</Option>
                    <Option value="hediye">Hediye</Option>
                    <Option value="diger_gelir">Diğer Gelir</Option>
                    <Option value="diger_gider">Diğer Gider</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="date"
                  label="Tarih"
                  rules={[
                    { required: true, message: "Lütfen tarihi seçiniz!" },
                  ]}
                >
                  <DatePicker style={{ width: "150px" }} />
                </Form.Item>
              </Space>

              <Form.Item name="description" label="Açıklama">
                <Input.TextArea
                  rows={2}
                  placeholder="Açıklama giriniz (isteğe bağlı)"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Kaydet
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card title="Son İşlemler" bordered={false} style={{ marginTop: 24 }}>
            <List
              itemLayout="horizontal"
              dataSource={gelirGiderListesi.slice().reverse().slice(0, 5)}
              renderItem={(item) => (
                <Popover
                  key={item.id}
                  content={item.description}
                  title={item.description ? "Açıklama" : null}
                  trigger="click"
                  visible={activePopoverId === item.id}
                  onVisibleChange={(visible) =>
                    handlePopoverVisibleChange(visible, item.id)
                  }
                >
                  <List.Item style={{ cursor: "pointer" }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={
                            item.type === "Gelir" ? (
                              <ArrowUpOutlined style={{ color: "#3f8600" }} />
                            ) : (
                              <ArrowDownOutlined style={{ color: "#cf1322" }} />
                            )
                          }
                        />
                      }
                      title={`${item.category} (${new Date(
                        item.date
                      ).toLocaleDateString()})`}
                      description={`${item.type === "Gelir" ? "+" : "-"}${
                        item.amount
                      } TL`}
                    />
                  </List.Item>
                </Popover>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default IncomeExpensePage;
