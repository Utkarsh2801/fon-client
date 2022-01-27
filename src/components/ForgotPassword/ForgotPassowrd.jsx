import React, { useEffect, useContext } from "react";
import classes from "./forgotpassword.module.css";

import { Form, Input, Button } from "antd";
import {  MailOutlined } from "@ant-design/icons";
import { AuthContext } from '../../context/auth-context';
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const { isLoggedIn, setIsLoading, forgotPassword } = React.useContext(AuthContext);
  const history = useHistory();
  
  useEffect(() => {
    if(isLoggedIn) {
      return history.push('/dashboard');
    }

    setIsLoading(false);
  }, [isLoggedIn]);


  const onFinish = async(values) => {
    await forgotPassword(values.email);
  };

  return (
    <div className={classes.fpassowrd}>
      <div className={classes['fpassword-form']}>
          <h1 style={{textAlign : "center"}}>Forgot Password</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ marginTop : "20px"}}
          >
              
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
          <Form.Item style={{textAlign : "center"}}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
