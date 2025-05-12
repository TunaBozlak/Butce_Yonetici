import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { mail, password } = values;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://v1.nocodeapi.com/tunabozlak37/google_sheets/erDdRuTCbOPSqGHP?tabId=user",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const user = result.data.find(
          (item) => item.mail === mail && item.password === password
        );
        console.log(user);
        if (user) {
          localStorage.setItem("row_id", user.row_id);
          localStorage.setItem("mail", user.mail);
          alert("Giriş başarılı!");
          navigate("/main");
        } else {
          alert("E-posta veya şifre hatalı!");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="login-page-container">
      <Form
        labelCol={{ span: 5 }}
        autoComplete="off"
        className="login-form"
        onFinish={handleLogin}
      >
        <Form.Item label="E-posta" name="mail">
          <Input required />
        </Form.Item>

        <Form.Item label="Şifre" name="password">
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
