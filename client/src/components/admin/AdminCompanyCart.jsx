import React from "react";
import {
    Button, notification,
    Popconfirm,
    Space,
    Table
} from "antd";
import {useAdmin} from "../../store/AdminStore";
import {SearchOutlined} from "@ant-design/icons";
import {useUser} from "../../store/UserStore";

const AdminCompanyCart = () => {
    let {
        getGoodsInCart,
        createOrder
    } = useAdmin();
    let {
        user
    } = useUser()
    const [goods, setGoods] = React.useState([]);
    const [api, contextHolder] = notification.useNotification()


    React.useEffect(() => {
        getGoodsInCart().then(({goods_array}) => {
            setGoods(goods_array);
        });
    }, [getGoodsInCart]);

    const customEmptyText = (
        <div>
            <SearchOutlined style={{fontSize: 24, color: '#999'}}/>
            <p>Пустоватенько...</p>
        </div>
    )

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Название товара',
            dataIndex: 'supplier_good.goodName',
            key: 'supplier_good.goodName'
        },
        {
            title: 'Тип товара',
            dataIndex: 'supplier_good.goodType',
            key: 'supplier_good.goodType'
        },
        {
            title: 'Бренд товара',
            dataIndex: 'supplier_good.goodBrand',
            key: 'supplier_good.goodBrand'
        },
        {
            title: 'Количество товара',
            dataIndex: 'countGood',
            key: 'countGood'
        },
        {
            title: 'Цена за единицу товара',
            dataIndex: 'supplier_good.goodPrice',
            key: 'supplier_good.goodPrice'
        }
    ];

    const confirmOrder = () => {
        createOrder(user.userId).then(() => {
            getGoodsInCart().then(({goods_array}) => {
                setGoods(goods_array);
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
                   columns={columns}
                   dataSource={goods.map((good) => ({...good, key: good.id}))}
                   title={() => {
                       return (
                           <Space size={"large"}>
                               <Popconfirm title="Вы уверены, что хотите приобрести эти товары?"
                                           okText="Да"
                                           onConfirm={confirmOrder}
                                           cancelText="Отмена">
                                   <Button style={{
                                       backgroundColor: 'green',
                                       color: 'white'
                                   }}>Приобрести товары</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
                   bordered
                   locale={{
                       emptyText: customEmptyText
                   }}
            />
        </>
    );
};

export default AdminCompanyCart;
