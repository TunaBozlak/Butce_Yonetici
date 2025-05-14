import { useContext, useState } from "react";
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
  List,
  Avatar,
  Row,
  Col,
  Popover,
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { IncomeExpenseContext } from "../context/IncomeExpenseContext";

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

const IncomeExpensePage = () => {
  const [form] = Form.useForm();
  const { addIncomeExpense, incomeExpenseList } =
    useContext(IncomeExpenseContext);
  const [type, setType] = useState("gelir");
  const mail = localStorage.getItem("mail");

  const handleAdd = (items) => {
    const newItem = {
      mail: mail,
      category: items.category,
      date: items.date.format("YYYY-MM-DD"),
      amount: Number(items.amount),
      type: type === "gelir" ? "Gelir" : "Gider",
      description: items.description,
    };
    const dataToSend = [
      [
        newItem.mail,
        newItem.category,
        newItem.date,
        newItem.amount,
        newItem.type,
        newItem.description,
      ],
    ];
    /* var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "post",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(dataToSend),
    };

    fetch(
      "https://v1.nocodeapi.com/tunabozlak37/google_sheets/erDdRuTCbOPSqGHP?tabId=budget",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Yeni veri eklendi");
        //addIncomeExpense(newItem);
        form.resetFields();
        setType("gelir");
      })
      .catch((error) => console.log("error", error));*/
    addIncomeExpense(newItem);
  };

  const handleTypeChange = (item) => {
    setType(item);
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={36}>
        <Col lg={12}>
          <Card title="Yeni Gelir / Gider Ekle">
            <Form form={form} layout="vertical" onFinish={handleAdd}>
              <Form.Item label="İşlem Tipi">
                <Segmented
                  options={[
                    { label: "Gelir", value: "gelir" },
                    { label: "Gider", value: "gider" },
                  ]}
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
                  <Select placeholder="Kategori Seçin">
                    {categoriesSelect.map((select) => (
                      <Option key={select.value} value={select.value}>
                        {select.label}
                      </Option>
                    ))}
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

        <Col lg={12}>
          <Card title="Son İşlemler">
            <List
              itemLayout="horizontal"
              dataSource={incomeExpenseList.slice().reverse().slice(0, 5)}
              renderItem={(item) => (
                <Popover
                  key={item.id}
                  content={item.description}
                  title={item.description ? "Açıklama" : null}
                  trigger="click"
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
