import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item
          label="E-posta"
          rules={[{ required: true, message: "Lütfen mail adresini giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şifre"
          rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary"> Giriş Yap</Button>
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
