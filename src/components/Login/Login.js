import React, { useEffect, useContext } from "react";
import classes from "./Login.module.css";

import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { AuthContext } from '../../context/auth-context';
import { useHistory } from "react-router-dom";


const Login = props => {
  const { isLoggedIn, setIsLoading, login } = React.useContext(AuthContext);
  const history = useHistory();
  const [form] = Form.useForm();
  
  useEffect(() => {
    if(isLoggedIn) {
      return history.push('/dashboard');
    }

    setIsLoading(false);
  }, [isLoggedIn]);

  const onFinish = async (values) => {
    login(values.email, values.password);

    form.resetFields();
  };

  return (
    <div className={classes.login}>
      <div className={classes['login-form']}>
          <h1 style={{textAlign : "center"}}>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}>
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
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot Password?
            </a>
          </Form.Item>

          <Form.Item style={{textAlign : "center"}}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Log In
            </Button>
          </Form.Item>
          <div style={{textAlign : "center"}}> <a style={{color : "#12B0E8"}} onClick={() => history.push('/register')}>Register</a></div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
