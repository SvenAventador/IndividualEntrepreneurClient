import React from 'react'
import {
    Form,
    Input,
    Button,
    Typography,
    notification
} from 'antd';
import {
    LockOutlined,
    MailOutlined
} from '@ant-design/icons';
import {
    NavLink,
    useNavigate
} from 'react-router-dom';
import {
    ADMIN_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    MANAGER_PATH,
    SUPPLIER_PATH
} from '../../utils/consts';
import {useUser} from "../../store/UserStore";
import Swal from "sweetalert2";

const {Title} = Typography;

const RegistrationForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [api, contextHolder] = notification.useNotification()

    const history = useNavigate()

    let {
        registrationUser
    } = useUser()

    return (
        <>
            {contextHolder}
            <Form name="registration"
                  initialValues={{
                      remember: false
                  }}
                  style={{
                      maxWidth: '500px',
                      margin: 'auto',
                      marginTop: '50px',
                  }}>
                <Title style={{
                    textAlign: 'center'
                }}>Регистрация</Title>

                <Form.Item name="email"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите ваш email!'
                               },
                               {
                                   type: 'email',
                                   message: 'Пожалуйста, введите корректную почту!'
                               }
                           ]}>
                    <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                           placeholder="Введите почту..."
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item name="password"
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, введите пароль!'
                               },
                               {
                                   min: 8,
                                   message: 'Минимальная длина пароля: 8 символов'
                               }
                           ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                    placeholder="Введите пароль..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item name="confirmPassword"
                           dependencies={['password']}
                           hasFeedback
                           rules={[
                               {
                                   required: true,
                                   message: 'Пожалуйста, подтвердите пароль!'
                               },
                               ({getFieldValue}) => ({
                                   validator(_, value) {
                                       if (!value || getFieldValue('password') === value)
                                           return Promise.resolve()

                                       return Promise.reject(new Error('Пароли не совпадают!'))
                                   }
                               })
                           ]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item style={{
                    textAlign: 'center'
                }}>
                    <Button type="primary"
                            htmlType="submit"
                            onClick={async () => {
                                if (password !== confirmPassword) {
                                    return api.error({
                                        message: 'Обратите внимание, тут ошибочка!',
                                        description: 'Ваши пароли не совпадают!',
                                        className: 'custom-class',
                                        style: {
                                            width: 600
                                        }
                                    })
                                }
                                registrationUser(email, password).then((data) => {
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
                                        text: 'Здравствуй, друг! Чувствуй себя как дома❤️',
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
                        Зарегистрироваться
                    </Button>
                </Form.Item>

                <Form.Item style={{
                    textAlign: 'center'
                }}>
                    Уже есть аккаунт? <NavLink to={LOGIN_PATH}>Войти</NavLink>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegistrationForm;
