import React from "react";
import { Layout, Menu } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import "./HomePage.css";
import { Link } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const HomePage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Layout className="layout">
      <Header className="header">
        <h1 className="header-title">Bütçe Yönetici</h1>
        <Menu
          mode="horizontal"
          theme="light"
          style={{ backgroundColor: "transparent", borderBottom: "none" }}
        >
          <Link to="/login">
            <Menu.Item icon={<LoginOutlined />}>Giriş Yap</Menu.Item>
          </Link>
          <Link to="/register">
            <Menu.Item icon={<UserAddOutlined />}>Kayıt Ol</Menu.Item>
          </Link>
        </Menu>
      </Header>
      <Content className="content">
        <div className="content-inner">
          <div className="hero-section">
            <h2 className="hero-title">Bütçenizi Kolayca Yönetin</h2>
            <p className="hero-subtitle">
              Gelir ve giderlerinizi takip edin, tasarruf hedeflerinizi
              belirleyin ve finansal durumunuzu kontrol altına alın.
            </p>
          </div>

          <div className="features-section">
            <div className="feature-item">
              <img src="./images/g.png" className="feature-image" />
              <h3 className="feature-title">Gelir Takibi</h3>
              <p className="feature-description">
                Gelirlerinizi kolayca kaydedin ve analiz edin.
              </p>
            </div>

            <div className="feature-item">
              <img src="./images/g1.png" className="feature-image" />
              <h3 className="feature-title">Gider Yönetimi</h3>
              <p className="feature-description">
                Harcamalarınızı kategorilere ayırarak kontrol edin.
              </p>
            </div>

            <div className="feature-item">
              <img src="./images/g2.png" className="feature-image" />
              <h3 className="feature-title">Tasarruf Hedefleri</h3>
              <p className="feature-description">
                Hedeflerinizi belirleyin ve ilerlemenizi takip edin.
              </p>
            </div>

            <div className="feature-item">
              <img src="./images/g3.png" className="feature-image" />
              <h3 className="feature-title">Finansal Raporlama</h3>
              <p className="feature-description">
                Finansal durumunuzu detaylı raporlarla görüntüleyin.
              </p>
            </div>
          </div>
        </div>
      </Content>
      <Footer className="footer">
        © {currentYear} Bütçe Yönetici | Tüm Hakları Saklıdır.
      </Footer>
    </Layout>
  );
};

export default HomePage;
