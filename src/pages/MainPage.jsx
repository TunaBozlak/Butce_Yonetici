import { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Modal,
  Input,
  Select,
  InputNumber,
  Button,
  Form,
} from "antd";
import {
  UserOutlined,
  PlusCircleOutlined,
  WalletOutlined,
  SettingOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import DashboardPage from "./DashboardPage";
import IncomeExpensePage from "./IncomeExpensePage";
import CalendarPage from "./CalendarPage";

import "./MainPage.css";
import Title from "antd/es/typography/Title";

const { TextArea } = Input;
const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <WalletOutlined />,
    label: "Finansal Durum Panosu",
  },
  {
    key: "2",
    icon: <PlusCircleOutlined />,
    label: "Gelir/Gider Ekle",
  },
  {
    key: "3",
    icon: <CalendarOutlined />,
    label: "Takvim",
  },
];

const jobOptions = [
  { value: "Mühendis", label: "Mühendis" },
  { value: "Öğretmen", label: "Öğretmen" },
  { value: "Doktor", label: "Doktor" },
  { value: "Öğrenci", label: "Öğrenci" },
  { value: "Diğer", label: "Diğer" },
];

const MainPage = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [otherJob, setOtherJob] = useState("");
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const row_id = localStorage.getItem("row_id");
  const mail = localStorage.getItem("mail");
  const name = localStorage.getItem("name");

  const renderContent = (key) => {
    switch (key) {
      case "1":
        return { title: "Finansal Durum Panosu", component: <DashboardPage /> };
      case "2":
        return { title: "Gelir/Gider Ekle", component: <IncomeExpensePage /> };
      case "3":
        return {
          title: "Takvim / Zaman Çizelgesi",
          component: <CalendarPage />,
        };
      default:
        return { title: "Finansal Durum Panosu", component: <DashboardPage /> };
    }
  };
  const { title, component } = renderContent(selectedKey);

  const getUserProfile = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch(
      "https://v1.nocodeapi.com/bettermessi1/google_sheets/fvwLcdhmUbEAKaWM?tabId=user",
      {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const users = result.data || result;
        const currentUser = users.find((user) => user.mail === mail);
        if (currentUser) {
          setPhoneNumber(currentUser.phoneNumber || "");
          setAge(currentUser.age || "");
          setJob(currentUser.job || "");
          setGender(currentUser.gender || "");
          setAddress(currentUser.address || "");
        }
      })
      .catch((error) => console.log("Kullanıcı verisi alınamadı:", error));
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleMenuClick = (key) => {
    setSelectedKey(key);
  };

  const handleSaveSettings = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const updatedData = {
      row_id: row_id,
      phoneNumber: phoneNumber,
      age: age,
      job: job,
      gender: gender,
      address: address,
    };

    var requestOptions = {
      method: "put",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify(updatedData),
    };

    fetch(
      "https://v1.nocodeapi.com/bettermessi1/google_sheets/fvwLcdhmUbEAKaWM?tabId=user",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          console.error("API Hatası:", response.status, response.statusText);
          throw new Error("Güncelleme başarısız oldu!");
        }
        return response.json();
      })
      .then((result) => {
        alert("Profil bilgileri güncellenmiştir.");

        getUserProfile();
        closeModal();
      })
      .catch((error) => {
        console.error("Hata:", error);
        alert("Bir hata oluştu! Güncelleme başarısız.");
      });
  };

  const userMenu = (
    <Menu>
      <Menu.Item icon={<SettingOutlined />} onClick={openModal}>
        Ayarlar
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <a href="/">Çıkış</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout-container">
      <Sider className="sider">
        <Title
          level={3}
          style={{ color: "white", textAlign: "center", paddingTop: "20px" }}
        >
          Bütçe Yönetici
        </Title>
        <Menu
          theme="dark"
          onClick={(e) => handleMenuClick(e.key)}
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ marginTop: "20px" }}
        />
      </Sider>
      <Layout>
        <Header className="header">
          <h1 className="header-title">{title}</h1>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar className="header-avatar" icon={<UserOutlined />} />
          </Dropdown>
        </Header>

        <Content className="content">
          <div className="content-container">{component}</div>
        </Content>

        <Footer className="footer">
          © {new Date().getFullYear()} Bütçe Yönetimi | Tüm Hakları Saklıdır.
        </Footer>
      </Layout>

      <Modal
        title="AYARLAR"
        centered
        open={open}
        onCancel={closeModal}
        footer={[
          <Button
            key="save"
            className="modal-footer-button-save"
            onClick={handleSaveSettings}
          >
            Kaydet
          </Button>,
          <Button
            key="cancel"
            className="modal-footer-button-cancel"
            onClick={closeModal}
          >
            İptal
          </Button>,
        ]}
      >
        <div className="modal-group">
          <h1 className="modal-label">Ad Soyad</h1>
          <div className="modal-input-static">{name}</div>
        </div>

        <div className="modal-group">
          <h1 className="modal-label">E-Posta</h1>
          <div className="modal-input-static">{mail}</div>
        </div>

        <Form>
          <Form.Item>
            <Title level={5}>Telefon Numarası</Title>
            <Input
              value={phoneNumber}
              placeholder="Telefon numarası giriniz..."
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Title level={5}>Yaş</Title>
            <InputNumber
              min={1}
              value={age}
              placeholder="Yaşınızı giriniz..."
              onChange={(value) => setAge(value)}
            />
          </Form.Item>

          <Form.Item>
            <Title level={5}>Meslek</Title>
            <Select
              value={job}
              placeholder="Mesleğinizi seçiniz..."
              onChange={(e) => {
                setJob(e);
              }}
            >
              {jobOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Title level={5}>Cinsiyet</Title>
            <Select
              value={gender}
              placeholder="Cinsiyetinizi Seçiniz..."
              onChange={(e) => setGender(e)}
            >
              <Select.Option value="kadın">Kadın</Select.Option>
              <Select.Option value="erkek">Erkek</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Title level={5}>Adres</Title>
            <TextArea
              value={address}
              placeholder="Adres giriniz..."
              rows={3}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
export default MainPage;
