import React from 'react';
import {
    Form,
    Input,
    Button,
    notification
} from 'antd';
import {
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_PATH, MAIN_PATH, MANAGER_PATH, REGISTRATION_PATH, SUPPLIER_PATH} from "../../utils/consts";
import Title from "antd/es/typography/Title";
import {useUser} from "../../store/UserStore";
import Swal from "sweetalert2";

const LoginForm = () => {
    const [userEmail, setUserEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [api, contextHolder] = notification.useNotification()

    const history = useNavigate()

    let {
        loginUser
    } = useUser()

    return (
        <>
            {contextHolder}
            <Form name="login-form"
                  initialValues={{remember: false}}
                  style={{
                      maxWidth: '500px',
                      margin: 'auto',
                      marginTop: '50px',
                  }}>

                <Form.Item>
                    <Title style={{
                        textAlign: 'center'
                    }}>
                        Авторизация
                    </Title>
                </Form.Item>

                <Form.Item name="email"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите Вашу почту!'
                               },
                               {
                                   type: 'email',
                                   message: 'Пожалуйста, введите корректную почту!'
                               }]}>
                    <Input size='large'
                           value={userEmail}
                           onChange={(e) => setUserEmail(e.target.value)}
                           prefix={<MailOutlined className="site-form-item-icon"/>}
                           placeholder="Введите почту..."
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите пароль!'
                        },
                        {
                            min: 8,
                            message: 'Минимальная длина пароля: 8 символов!'
                        }
                    ]}>
                    <Input.Password size='large'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    placeholder="Введите пароль..."
                    />
                </Form.Item>

                <Form.Item style={{
                    textAlign: 'center'
                }}>
                    <Button type="primary"
                            htmlType="submit"
                            onClick={async () => {
                                loginUser(userEmail, password).then((data) => {
                                    switch (data.userRole) {
                                        case "USER":
                                            history(MAIN_PATH)
                                            break
                                        case "ADMIN":
                                            history(ADMIN_PATH)
                                            break
                                        case "MANAGER":
                                            history(MANAGER_PATH)
                                            break
                                        case "SUPPLIER":
                                            history(SUPPLIER_PATH)
                                            break
                                        default:
                                            return null
                                    }
                                    Swal.fire({
                                        title: "Внимание",
                                        text: 'C возвращением, друг! Чувствуй себя как дома❤️',
                                        icon: "success"
                                    });
                                }).catch((error) => {
                                    return api.error({
                                        message: 'Обратите внимание, тут ошибочка!',
                                        description: error.response.data.message,
                                        className: 'custom-class',
                                        style: {
                                            width: 600
                                        }
                                    })
                                })
                            }}>
                        Войти в аккаунт
                    </Button>
                </Form.Item>

                <Form.Item style={{
                    textAlign: 'center'
                }}>
                    Нет аккаунта? <NavLink to={REGISTRATION_PATH}>Зарегистрируйтесь!</NavLink>
                </Form.Item>

            </Form>
        </>
    );
};

export default LoginForm;
