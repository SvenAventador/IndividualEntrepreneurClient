import React from 'react';
import {
    Button,
    Input,
    Modal,
    notification,
    Upload
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons";
import {useUser} from "../../../store/UserStore";
import {useSupplier} from "../../../store/SupplierStore";
import Swal from "sweetalert2";

const AddAndEditGoodModal = (props) => {
    const {
        open,
        onOk,
        onCancel,
        good
    } = props

    const [goodName, setGoodName] = React.useState(good?.goodName || '')
    const [goodDescription, setGoodDescription] = React.useState(good?.goodDescription || '')
    const [goodType, setGoodType] = React.useState(good?.goodType || '')
    const [goodBrand, setGoodBrand] = React.useState(good?.goodBrand || '')
    const [goodAmount, setGoodAmount] = React.useState(good?.goodAmount || 0)
    const [goodPrice, setGoodPrice] = React.useState(good?.goodPrice || 0)
    const [fileList, setFileList] = React.useState([]);

    const [api, contextHolder] = notification.useNotification()

    React.useEffect(() => {
        if (good) {
            setGoodName(good?.goodName)
            setGoodDescription(good?.goodDescription)
            setGoodType(good?.goodType)
            setGoodBrand(good?.goodBrand)
            setGoodAmount(good?.goodAmount)
            setGoodPrice(good?.goodPrice)
            setFileList(good.goodImage ? [{
                uid: '-1',
                name: 'Изображение товара',
                status: 'done',
                url: `${process.env.REACT_APP_API_URL}/${good.goodImage}`
            }] : []);
        } else {
            setGoodName('')
            setGoodDescription('')
            setGoodType('')
            setGoodBrand('')
            setGoodAmount('')
            setGoodPrice('')
            setFileList([]);
        }
    }, [good])

    const handleUpload = ({file}) => {
        setFileList([file]);
        return false;
    };

    let {
        user: {userId}
    } = useUser()

    let {
        addGood,
        updateGood
    } = useSupplier()

    const addGoods = () => {
        if (!goodName) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите название товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!goodDescription) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите описание товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!goodType) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите тип товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!goodBrand) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите бренд товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (+goodAmount < 1) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Количество товаров не может быть меньше 1!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (+goodPrice < 50) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Минимальная цена товара - 50 рублей!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!fileList) {
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
        formData.append("goodName", goodName)
        formData.append("goodDescription", goodDescription)
        formData.append("goodType", goodType)
        formData.append("goodBrand", goodBrand)
        formData.append("goodAmount", goodAmount)
        formData.append("goodPrice", goodPrice)
        formData.append("goodImage", fileList[0])
        formData.append("userId", userId)

        addGood(userId, formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Товар успешно создан!'
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

    const updateGoods = () => {
        if (!goodName) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите название товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!goodDescription) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите описание товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!goodType) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите тип товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!goodBrand) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Пожалуйста, введите бренд товара!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (+goodAmount < 1) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Количество товаров не может быть меньше 1!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (+goodPrice < 50) {
            return api.error({
                message: 'Обратите внимание, тут ошибочка!',
                description: 'Минимальная цена товара - 50 рублей!',
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }

        if (!fileList) {
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
        formData.append("id", good.id)
        formData.append("goodName", goodName)
        formData.append("goodDescription", goodDescription)
        formData.append("goodType", goodType)
        formData.append("goodBrand", goodBrand)
        formData.append("goodAmount", goodAmount)
        formData.append("goodPrice", goodPrice)
        formData.append("goodImage", fileList[0])
        formData.append("userId", userId)

        updateGood(formData).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Товар успешно обновлен!'
            }).then(() => {
                onOk()
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

    const clearData = () => {
        setGoodName('')
        setGoodDescription('')
        setGoodType('')
        setGoodBrand('')
        setGoodAmount('')
        setGoodPrice('')
        setFileList([]);
    }

    return (
        <>
            {contextHolder}
            <Modal open={open}
                   title={!good ? 'Добавить товар' : 'Изменить товар'}
                   onOk={onOk}
                   onCancel={onCancel}
                   centered
                   maskClosable={false}
                   footer={[
                       <Button type={"primary"}
                               key='cancel'>
                           Отмена
                       </Button>,
                       <Button style={{
                           background: 'green',
                           color: 'white'
                       }}
                               key='ok'
                               onClick={() => {
                                   if (!good) {
                                       addGoods()
                                   } else {
                                       updateGoods()
                                   }
                               }}>
                           Сохранить изменения
                       </Button>
                   ]}>
                <Input value={goodName}
                       onChange={(e) => setGoodName(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название товара..."
                />

                <TextArea value={goodDescription}
                          onChange={(e) => setGoodDescription(e.target.value)}
                          style={{marginBottom: '1rem'}}
                          rows={5}
                          placeholder="Введите описание товара..."
                />

                <Input value={goodType}
                       onChange={(e) => setGoodType(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название типа..."
                />

                <Input value={goodBrand}
                       onChange={(e) => setGoodBrand(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название бренда..."
                />

                <Input value={goodAmount}
                       onChange={(e) => setGoodAmount(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите количество товара..."
                       prefix='шт'
                />

                <Input value={goodPrice}
                       onChange={(e) => setGoodPrice(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите цену товара..."
                       prefix='₽'
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

export default AddAndEditGoodModal;
