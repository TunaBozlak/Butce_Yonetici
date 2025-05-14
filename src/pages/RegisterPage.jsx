import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (values) => {
    const { name, surname, mail, password } = values;
    /*var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "post",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify([[name, surname, mail, password]]),
    };

    fetch(
      "https://v1.nocodeapi.com/tunabozlak37/google_sheets/erDdRuTCbOPSqGHP?tabId=user",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("row_id", result.row_id);
        localStorage.setItem("mail", result.mail);

        alert("Kayıt Başarılı!");
        navigate("/login");
      })
      .catch((error) => console.log("error", error));*/
    navigate("/login");
  };

  return (
    <div className="register-page-container">
      <Form
        labelCol={{ span: 5 }}
        autoComplete="off"
        className="register-form"
        onFinish={handleRegister}
      >
        <Form.Item label="Ad" name="name">
          <Input required />
        </Form.Item>

        <Form.Item label="Soyad" name="surname">
          <Input required />
        </Form.Item>

        <Form.Item label="E-posta" name="mail">
          <Input required />
        </Form.Item>

        <Form.Item label="Şifre" name="password">
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
