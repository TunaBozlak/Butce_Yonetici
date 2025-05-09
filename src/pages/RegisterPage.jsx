import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/main");
  };

  return (
    <div className="register-page-container">
      <Form
        labelCol={{ span: 5 }}
        autoComplete="off"
        className="register-form"
        onFinish={handleRegister}
      >
        <Form.Item label="Ad">
          <Input required />
        </Form.Item>

        <Form.Item label="Soyad">
          <Input required />
        </Form.Item>

        <Form.Item label="E-posta">
          <Input required />
        </Form.Item>

        <Form.Item label="Şifre">
          <Input.Password required />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kayıt Ol
          </Button>
        </Form.Item>

        <div className="form-footer-links">
          Zaten bir hesabınız var mı?
          <Link to="/login">
            <Button type="link">Giriş Yap</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
