import { Layout, Button, Row } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";

const { Header, Footer, Content } = Layout;

const HomePage = () => {
  return (
    <Layout className="layout">
      <Header className="header">
        <h1 className="header-title">Bütçe Yönetici</h1>

        <div className="header-title">
          <Link to="/login">
            <Button icon={<LoginOutlined />}>Giriş Yap</Button>
          </Link>

          <Link to="/register">
            <Button icon={<UserAddOutlined />}>Kayıt Ol</Button>
          </Link>
        </div>
      </Header>

      <Content className="content">
        <div className="content-inner">
          <div className="hero-section">
            <Title level={2}>Bütçenizi Kolayca Yönetin</Title>
            <p className="hero-subtitle">
              Gelir ve giderlerinizi takip edin, tasarruf hedeflerinizi
              belirleyin ve finansal durumunuzu kontrol altına alın.
            </p>
          </div>

          <Row className="features-section">
            <div className="feature-item">
              <img src="./images/g.png" className="feature-image" />
              <Title level={4} style={{ color: "#2d3748" }}>
                Gelir Takibi
              </Title>
              <p className="feature-description">
                Gelirlerinizi kolayca kaydedin ve analiz edin.
              </p>
            </div>

            <div className="feature-item">
              <img src="./images/g1.png" className="feature-image" />
              <Title level={4} style={{ color: "#2d3748" }}>
                Gider Yönetimi
              </Title>
              <p className="feature-description">
                Harcamalarınızı kategorilere ayırarak kontrol edin.
              </p>
            </div>

            <div className="feature-item">
              <img src="./images/g2.png" className="feature-image" />
              <Title level={4} style={{ color: "#2d3748" }}>
                Tasarruf Hedefleri
              </Title>
              <p className="feature-description">
                Hedeflerinizi belirleyin ve ilerlemenizi takip edin.
              </p>
            </div>

            <div className="feature-item">
              <img src="./images/g3.png" className="feature-image" />
              <Title level={4} style={{ color: "#2d3748" }}>
                Finansal Raporlama
              </Title>
              <p className="feature-description">
                Finansal durumunuzu detaylı raporlarla görüntüleyin.
              </p>
            </div>
          </Row>
        </div>
      </Content>

      <Footer className="footer">
        © {new Date().getFullYear()} Bütçe Yönetici | Tüm Hakları Saklıdır.
      </Footer>
    </Layout>
  );
};

export default HomePage;
