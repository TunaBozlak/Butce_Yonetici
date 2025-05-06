import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="register-page-container">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className="register-form"
      >
        <Form.Item
          label="Ad"
          rules={[
            { required: true, message: "Lütfen adınızı giriniz!" },
            {
              type: "email",
              message: "Lütfen geçerli bir e-posta adresi girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Soyad"
          rules={[{ required: true, message: "Lütfen soyadınızı giriniz!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="E-posta"
          rules={[
            { required: true, message: "Lütfen mail adresinizi giriniz!" },
            { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
          ]}
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
          <Button type="primary" block htmlType="submit">
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
