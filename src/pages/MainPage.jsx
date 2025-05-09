import { useState } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Modal,
  Input,
  Select,
  InputNumber,
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
  { value: "engineer", label: "Mühendis" },
  { value: "teacher", label: "Öğretmen" },
  { value: "doctor", label: "Doktor" },
  { value: "student", label: "Öğrenci" },
  { value: "other", label: "Diğer" },
];

const MainPage = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(null);
  const [job, setJob] = useState(undefined);
  const [otherJob, setOtherJob] = useState("");
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

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
    closeModal();
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
        <div className="sider-header">Bütçe Yönetici</div>
        <Menu
          theme="dark"
          onClick={(e) => handleMenuClick(e.key)}
          selectedKeys={selectedKey}
          items={menuItems}
          className="sider-menu"
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
          © {currentYear} Bütçe Yönetimi | Tüm Hakları Saklıdır.
        </Footer>
      </Layout>

      <Modal
        title="AYARLAR"
        centered
        open={open}
        onCancel={closeModal}
        width={600}
        footer={[
          <button
            key="save"
            className="modal-footer-button-save"
            onClick={handleSaveSettings}
          >
            Kaydet
          </button>,
          <button
            key="cancel"
            className="modal-footer-button-cancel"
            onClick={closeModal}
          >
            İptal
          </button>,
        ]}
      >
        <div className="modal-content">
          <div className="modal-group">
            <h1 className="modal-label">Ad Soyad</h1>
            <div className="modal-input-static">Tuna Bozlak</div>
          </div>

          <div className="modal-group">
            <h1 className="modal-label">E-Posta</h1>
            <div className="modal-input-static">a@gmail.com</div>
          </div>

          <div className="modal-group">
            <h1 className="modal-label">Telefon Numarası</h1>
            <Input
              placeholder="Telefon numarası giriniz..."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="modal-input"
            />
          </div>

          <div className="modal-group">
            <h1 className="modal-label">Yaş</h1>
            <InputNumber
              min={1}
              placeholder="Yaşınızı giriniz..."
              value={age}
              onChange={(value) => setAge(value)}
              className="modal-input-number"
            />
          </div>

          <div className="modal-group">
            <h1 className="modal-label">Meslek</h1>
            <Select
              placeholder="Mesleğinizi seçiniz..."
              value={job}
              onChange={(value) => {
                setJob(value);
                if (value !== "other") {
                  setOtherJob("");
                }
              }}
              className="modal-select"
            >
              {jobOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            {job === "other" && (
              <Input
                placeholder="Lütfen mesleğinizi belirtin..."
                value={otherJob}
                onChange={(e) => setOtherJob(e.target.value)}
                className="other-job-input"
              />
            )}
          </div>

          <div className="modal-group">
            <h1 className="modal-label">Adres</h1>
            <TextArea
              placeholder="Adres giriniz..."
              className="modal-textarea"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
export default MainPage;
