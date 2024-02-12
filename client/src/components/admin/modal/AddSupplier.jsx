import React from 'react';
import {Button, Input, Modal, notification, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useAdmin} from "../../../store/AdminStore";
import Swal from "sweetalert2";

const AddSupplier = (props) => {
    const {
        open,
        onOk,
        onCancel
    } = props

    const [userEmail, setUserEmail] = React.useState('')
    const [userSurname, setUserSurname] = React.useState('')
    const [userName, setUserName] = React.useState('')
    const [userPatronymic, setUserPatronymic] = React.useState('');
    const [fileList, setFileList] = React.useState([]);

    const [api, contextHolder] = notification.useNotification()

    const handleUpload = ({file}) => {
        setFileList([file]);
        return false;
    };

    const clearData = () => {
        setUserEmail('')
        setUserSurname('')
        setUserName('')
        setUserPatronymic('')
        setFileList([])
    }

    let {
        addSupplier
    } = useAdmin()

    const addSuppliers = () => {
        if (!userEmail) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите почту!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите корректную почту! Формат почты X@X.ru',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!userSurname) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите фамилию поставщика!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!userName) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите имя поставщика!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!userPatronymic) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите отчество поставщика!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (fileList.length === 0) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, выберите изображение!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        const formData = new FormData()
        formData.append('userEmail', userEmail)
        formData.append('supplierSurname', userSurname)
        formData.append('supplierName', userName)
        formData.append('supplierPatronymic', userPatronymic)
        formData.append('supplierImage', fileList[0])

        addSupplier(formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Поставщик успешно добавлен!'
            }).then(() => {
                onOk()
                clearData()
            })
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
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={'Добавить поставщика'}
                   onOk={onOk}
                   onCancel={onCancel}
                   centered
                   maskClosable={false}
                   footer={[
                       <Button type={"primary"}
                               key='cancel'
                               onClick={() => {
                                   onCancel()
                               }}>
                           Отмена
                       </Button>,
                       <Button style={{
                           background: 'green',
                           color: 'white'
                       }}
                               key='ok'
                               onClick={() => {
                                   addSuppliers()
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <Input value={userEmail}
                       onChange={(e) => setUserEmail(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите почту поставщика..."
                />
                <Input value={userSurname}
                       onChange={(e) => setUserSurname(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите фамилию поставщика..."
                />
                <Input value={userName}
                       onChange={(e) => setUserName(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите имя поставщика..."
                />
                <Input value={userPatronymic}
                       onChange={(e) => setUserPatronymic(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите отчество поставщика..."
                />
                <Upload customRequest={handleUpload}
                        fileList={fileList}
                        maxCount={1}
                        listType="picture">
                    <Button icon={<UploadOutlined/>}>
                        Выбрать изображение (максимум 1)
                    </Button>
                </Upload>
            </Modal>
        </>
    );
};

export default AddSupplier;
