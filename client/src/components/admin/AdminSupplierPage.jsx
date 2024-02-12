import React from 'react';
import {
    Button,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {useAdmin} from "../../store/AdminStore";
import {SearchOutlined} from "@ant-design/icons";
import AddSupplier from "./modal/AddSupplier";
import {useUser} from "../../store/UserStore";

const AdminSupplierPage = () => {
    let {
        getAllSuppliers,
        deleteOneSupplier,
        deleteAllSupplier,
        addToCart
    } = useAdmin()
    let {
        user
    } = useUser()

    const [allSuppliers, setAllSuppliers] = React.useState([])
    React.useEffect(() => {
        getAllSuppliers().then(({suppliers}) => {
            setAllSuppliers(suppliers)
        })
    }, [getAllSuppliers])

    const [api, contextHolder] = notification.useNotification()

    const [open, setOpen] = React.useState(false)
    const handleOk = () => {
        getAllSuppliers().then(({suppliers}) => {
            setAllSuppliers(suppliers)
        })
        setOpen(false)
    }
    const handleCancel = () => {
        setOpen(false)
    }

    const addCart = (record) => {
        addToCart(record.supplierId, user.userId, record.id).then(() => {
            return api.success({
                message: 'Внимание!',
                description: `Товар успешно добавлен в корзину!`,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        }).catch((error) => {
            return api.error({
                message: 'Внимание!',
                description: error.response.data.message,
                className: 'custom-class',
                style: {
                    width: 600
                }
            })
        })
    }

    const expandedRowRender = (record) => {
        const column = [
            {
                title: '№ товара',
                dataIndex: 'id',
                key: 'id',
                defaultSortOrder: 'descend',
                sorter: (a, b) => b.id - a.id
            },
            {
                title: 'Название товара',
                dataIndex: 'goodName',
                key: 'goodName',
            },
            {
                title: 'Тип товара',
                dataIndex: 'goodType',
                key: 'goodType'
            },
            {
                title: 'Бренд товара',
                dataIndex: 'goodBrand',
                key: 'goodBrand'
            },
            {
                title: 'Количество товара',
                dataIndex: 'goodAmount',
                key: 'goodAmount',
                defaultSortOrder: 'descend',
                sorter: (a, b) => b.id - a.id,
                render: (text) => {
                    if (+text >= 10)
                        return <span style={{color: "green"}}>В количестве {text}</span>
                    if (+text <= 5 && +text >= 9)
                        return <span style={{color: "orange"}}>В количестве {text}</span>
                    else
                        return <span style={{color: "red"}}>В количестве {text}</span>
                }
            },
            {
                title: 'Цена товара',
                dataIndex: 'goodPrice',
                key: 'goodPrice',
                defaultSortOrder: 'descend',
                sorter: (a, b) => b.id - a.id,
                render: (text) => {
                    return <span>{text} ₽</span>
                }
            },
            {
                title: '',
                key: 'actions',
                render: (record) => {
                    return (
                        <Space size="large" style={{
                            display: "flex",
                            flexFlow: "column"
                        }}>
                            <Button style={{
                                background: 'green',
                                color: 'white'
                            }}
                            onClick={() => {
                                addCart(record)
                            }}>Купить товар</Button>
                        </Space>
                    )
                }
            }
        ]

        return <Table columns={column}
                      dataSource={record.supplier_goods
                          .filter((good) => good.goodAmount)
                          .map((good) => ({...good, key: good.id}))}
                      pagination={false}
        />;

    }

    const columns = [
        {
            title: '№ поставщика',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => b.id - a.id
        },
        {
            title: 'Фамилия поставщика',
            dataIndex: 'supplierSurname',
            key: 'supplierSurname'
        },
        {
            title: 'Имя поставщика',
            dataIndex: 'supplierName',
            key: 'supplierName'
        },
        {
            title: 'Отчество поставщика',
            dataIndex: 'supplierPatronymic',
            key: 'supplierPatronymic'
        },
        {
            title: 'Почта поставщика',
            dataIndex: 'user',
            key: 'userEmail',
            render: (user) => user && user.userEmail
        },
        {
            title: '',
            key: 'actions',
            render: (record) => {
                return (
                    <Space size="large" style={{
                        display: "flex",
                        flexFlow: "column"
                    }}>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить этого поставщика?"
                            onConfirm={() => confirmOneSupplier(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>
                                Удалить поставщика
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const customEmptyText = (
        <div>
            <SearchOutlined style={{fontSize: 24, color: '#999'}}/>
            <p>Пустоватенько...</p>
        </div>
    );

    const confirmOneSupplier = (id) => {
        deleteOneSupplier(id).then(() => {
            getAllSuppliers().then(({suppliers}) => {
                setAllSuppliers(suppliers);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Поставщик с номером ${id} успешно удален!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmAllSupplier = () => {
        deleteAllSupplier().then(() => {
            getAllSuppliers().then(({suppliers}) => {
                setAllSuppliers(suppliers);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши поставщики успешно удалены!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    return (
        <>
            {contextHolder}
            <Table style={{
                position: 'relative',
                width: '100%',
                height: 'max-content',
                zIndex: '999'
            }}
                   title={() => {
                       return (
                           <Space size="large">
                               <Button style={{
                                   backgroundColor: 'green',
                                   color: 'white'
                               }}
                                       onClick={() => {
                                           setOpen(true)
                                       }}>Добавить поставщика</Button>
                               <Popconfirm
                                   title="Вы уверены, что хотите удалить всех поставщиков?"
                                   onConfirm={() => confirmAllSupplier()}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button danger>Удалить всех поставщиков</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
                   bordered
                   expandable={{
                       expandedRowRender,
                       rowExpandable: (record) => record.supplier_goods.length !== 0
                   }}
                   columns={columns}
                   dataSource={allSuppliers.map((suppliers) => ({...suppliers, key: suppliers.id}))}
                   locale={{
                       emptyText: customEmptyText
                   }}
            />

            <AddSupplier open={open}
                         onOk={handleOk}
                         onCancel={handleCancel}/>
        </>
    );
};

export default AdminSupplierPage;
