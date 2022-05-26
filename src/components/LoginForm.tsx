import React, { FC, useState } from "react";
import { Form, Input, Button } from "antd";
import { rules } from "../utils/rules";
// import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const LoginForm: FC = () => {
  // const dispatch = useDispatch();
  const { error, isLoading } = useTypedSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useActions();

  const onFinish = () => {
    // dispatch(AuthActionCreators.login(username, password) as any);
    login(username, password);
    console.log("Success");
  };

  const onFinishFailed = () => {
    console.log("Failed");
  };
  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required("Введите имя пользователя")]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required("Введите пароль")]}
      >
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
