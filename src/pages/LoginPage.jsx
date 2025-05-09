import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/main");
  };
  return (
    <div className="login-page-container">
      <Form
        labelCol={{ span: 5 }}
        autoComplete="off"
        className="login-form"
        onFinish={handleLogin}
      >
        <Form.Item label="E-posta">
          <Input required />
        </Form.Item>

        <Form.Item label="Şifre">
          <Input.Password required />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="login">
            Giriş Yap
          </Button>
        </Form.Item>

        <div className="form-footer-links">
          Hesabın Yok Mu?
          <Link to="/register">
            <Button type="link">Kayıt Ol</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
