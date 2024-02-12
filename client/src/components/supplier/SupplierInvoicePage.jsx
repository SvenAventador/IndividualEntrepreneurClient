import React from 'react';
import {useSupplier} from "../../store/SupplierStore";
import {useUser} from "../../store/UserStore";
import {
    Button,
    notification,
    Popconfirm,
    Select,
    Space,
    Table
} from "antd";

const SupplierInvoicePage = () => {
    let {
        getAllInvoices,
        adoptInvoice,
        changeStatus
    } = useSupplier()
    let {
        user
    } = useUser()
    const [invoice, setAllInvoice] = React.useState([])
    const [api, contextHolder] = notification.useNotification()

    React.useEffect(() => {
        getAllInvoices(user.userId).then(({allInvoice}) => {
            setAllInvoice(allInvoice)
        })
    }, [getAllInvoices, user.userId])

    const onConfirm = (id) => {
        console.log(id)
        adoptInvoice(id).then(() => {
            getAllInvoices(user.userId).then(({allInvoice}) => {
                setAllInvoice(allInvoice)
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Накладная одобрена!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const changeSelectElement = (record, value) => {
        changeStatus(record, value).then(() => {
            getAllInvoices(user.userId).then(({allInvoice}) => {
                setAllInvoice(allInvoice)
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Статус успешно обновлен!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    };

    const column = [
        {
            title: '№ товара',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Файл накладной',
            dataIndex: 'invoiceFile',
            key: 'invoiceFile',
            render: (text, _) => {
                return (<a href={`${process.env.REACT_APP_API_URL}/xlsx/${text}`}
                           download>{text}</a>)
            }
        },
        {
            title: 'Состояние',
            dataIndex: 'isAdopted',
            key: 'isAdopted',
            render: (text, _) => (
                <span style={{color: text ? 'green' : 'red'}}>
                    {text ? 'Принята' : 'Ждет принятия'}
                </span>
            )
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            render: (record) => {
                return(
                    <Space size="large" style={{display: "flex", flexFlow: "column"}}>
                    {record && record.isAdopted ? (
                        <Select defaultValue={record.deliveryOrderStatusId}
                                onChange={(value) => {
                                    changeSelectElement(record.id, value)
                                }}>
                            {DeliveryStatus.map((status) => (
                                <Select.Option key={status.id} value={status.id}>{status.label}</Select.Option>
                            ))}
                        </Select>
                    ) : (
                        <Popconfirm
                            title="Вы уверены, что хотите одобрить накладную?"
                            onConfirm={() => onConfirm(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button style={{
                                background: 'green',
                                color: 'white'
                            }}>
                                Одобрить накладную
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
                )
            }
        }
    ]

    const DeliveryStatus = [
        {
            id: 1,
            value: 'Заказ обрабатывается',
            label: 'Заказ обрабатывается',
            key: 1
        },
        {
            id: 2,
            value: 'Заказ обработан',
            label: 'Заказ обработан',
            key: 2
        },
        {
            id: 3,
            value: 'Заказ в доставке',
            label: 'Заказ в доставке',
            key: 3
        },
        {
            id: 4,
            value: 'Заказ готов к получению',
            label: 'Заказ готов к получению',
            key: 4
        },
        {
            id: 5,
            value: 'Заказ в городе',
            label: 'Заказ в городе',
            key: 5
        },
        {
            id: 6,
            value: 'Заказ получен',
            label: 'Заказ получен',
            key: 6
        }
    ];

    return (
        <>
            {contextHolder}
            <Table
                columns={column}
                dataSource={invoice.map((invoiceItem) => ({
                    ...invoiceItem,
                    key: invoiceItem.id,
                    actions: {
                        id: invoiceItem.id,
                        isAdopted: invoiceItem.isAdopted,
                        deliveryOrderStatusId: invoiceItem.deliveryOrderStatusId
                    }
                }))}
            />

        </>
    );
};

export default SupplierInvoicePage;
