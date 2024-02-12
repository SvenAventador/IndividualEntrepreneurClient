import React from 'react';
import {
    Button,
    notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {useManager} from "../../store/ManagerStore";

const MangerInvoicesPage = () => {
    let {
        getAdoptInvoice,
        closeOrder
    } = useManager()

    const [api, contextHolder] = notification.useNotification()

    const [invoices, setInvoices] = React.useState([])
    React.useEffect(() => {
        getAdoptInvoice().then(({invoices}) => {
            setInvoices(invoices)
        })
    }, [getAdoptInvoice])

    const onConfirm = (record) => {
        console.log(record)
        closeOrder(record).then(() => {
            getAdoptInvoice().then(({invoices}) => {
                setInvoices(invoices)
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Данная накладная принята`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

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
                return (
                    <Space size="large" style={{
                        display: "flex",
                        flexFlow: "column"
                    }}>

                        <Popconfirm
                            title="Вы уверены, что хотите принять товары в систему?"
                            onConfirm={() => {
                                onConfirm(record.id)
                            }}
                            okText="Да"
                            cancelText="Отмена">
                            <Button style={{
                                background: 'green',
                                color: 'white'
                            }}>
                                Принять товары в систему
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]
    return (
        <>
            {contextHolder}
            <Table columns={column}
                   dataSource={invoices.map((invoiceItem) => ({
                       ...invoiceItem,
                       key: invoiceItem.id,
                       actions: {
                           id: invoiceItem.id,
                       }
                   }))}/>
        </>
    );
};

export default MangerInvoicesPage;
