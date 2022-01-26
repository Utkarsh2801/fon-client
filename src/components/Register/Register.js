import React, { useContext, useEffect } from "react";
import classes from "./Register.module.css";

import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined,UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Register = () => {
  const { isLoggedIn, setIsLoading, register } = React.useContext(AuthContext);
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if(isLoggedIn) {
      return history.push('/dashboard');
    }

    setIsLoading(false);
  }, [isLoggedIn]);

  const onFinish = async (values) => {
      await register(values.name, values.email, values.password, 'manufacturer');
      form.resetFields();
  };

  return (
    <div className={classes.register}>
      <div className={classes['register-form']}>
          <h1 style={{textAlign : "center"}}>Register</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          >
          
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
              type="text"
            />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
            ]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
            ]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please input your Confirm Password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          
          <Form.Item style={{textAlign : "center"}}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Sign Up
            </Button>
          </Form.Item>

          <div style={{textAlign : "center"}}> <a  style={{color : "#12B0E8"}} onClick={() => history.push('/login')}>Log In</a></div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
