import React from 'react';
import {useSupplier} from "../../store/SupplierStore";
import {useUser} from "../../store/UserStore";
import {
    Table,
    Button,
    Input,
    Space,
    Row,
    Col,
    Image,
    Typography,
    Popconfirm, notification
} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words'
import AddAndEditGoodModal from "./modal/AddAndEditGoodModal";

const {Text} = Typography

const SupplierGoodPage = () => {
    let {
        user: {userId}
    } = useUser()
    let {
        getAllGoods,
        getOneGood,
        deleteAllGood,
        deleteOneGood
    } = useSupplier()

    const [api, contextHolder] = notification.useNotification()

    const [allGoods, setAllGoods] = React.useState([])
    React.useEffect(() => {
        getAllGoods(userId).then(({goods}) => {
            setAllGoods(goods)
        })
    }, [userId, getAllGoods])

    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const searchInput = React.useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{
                padding: 8,
            }}
                 onKeyDown={(e) => e.stopPropagation()}>
                <Input ref={searchInput}
                       placeholder={`Поиск по названию товара`}
                       value={selectedKeys[0]}
                       onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                       onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                       style={{
                           marginBottom: 8,
                           display: 'block',
                       }}
                />
                <Space>
                    <Button type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{
                                width: 90,
                            }}>
                        Поиск
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)}
                            size="small"
                            style={{
                                width: 90,
                            }}
                    >
                        Стереть
                    </Button>
                    <Button type="link"
                            size="small"
                            onClick={() => {
                                confirm({
                                    closeDropdown: false,
                                });
                                setSearchText(selectedKeys[0]);
                                setSearchedColumn(dataIndex);
                            }}
                    >
                        Фильтровать
                    </Button>
                    <Button type="link"
                            size="small"
                            onClick={() => {
                                close();
                            }}>
                        закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter highlightStyle={{
                    backgroundColor: '#ffc069',
                    padding: 0,
                }}
                             searchWords={[searchText]}
                             autoEscape
                             textToHighlight={text ? text.toString() : ''}/>
            ) : (
                text
            ),
    });


    const columns = [
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
            ...getColumnSearchProps('goodName'),
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
            title: 'Бренд товара',
            dataIndex: 'goodPrice',
            key: 'goodPrice',
            render: (text) => {
                return <span>{text} ₽</span>
            }
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (record) => {
                return (
                    <Space size="large" style={{
                        display: "flex",
                        flexFlow: "column"
                    }}>
                        <Button type={"primary"}
                                onClick={() => {
                                    showModal(record.id)
                                }}>Изменить товар</Button>
                        <Popconfirm
                            title="Вы уверены, что хотите удалить этот товар?"
                            onConfirm={() => confirmOneGood(record.id)}
                            okText="Да"
                            cancelText="Отмена">
                            <Button danger>Удалить товар</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const [open, setOpen] = React.useState(false)
    const handleOk = () => {
        getAllGoods(userId).then(({goods}) => {
            setAllGoods(goods)
        })
        setOpen(false)
    }
    const handleCancel = () => {
        setOpen(false)
    }

    const [oneGood, setOneGood] = React.useState(null)

    const showModal = (id) => {
        setOpen(true)
        if (id) {
            getOneGood(id).then((good) => {
                setOneGood(good.good)
            })
        } else {
            setOneGood(null)
        }
    }

    const confirmAllGood = () => {
        deleteAllGood(userId).then(() => {
            getAllGoods(userId).then(({goods}) => {
                setAllGoods(goods);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Все Ваши товары успешно удалены!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const confirmOneGood = (id) => {
        deleteOneGood(id).then(() => {
            getAllGoods(userId).then(({goods}) => {
                setAllGoods(goods);
            }).then(() => {
                return api.success({
                    message: 'Внимание!',
                    description: `Товар с номером ${id} успешно удален!`,
                    className: 'custom-class',
                    style: {
                        width: 600
                    }
                })
            })
        })
    }

    const customEmptyText = (
        <div>
            <SearchOutlined style={{ fontSize: 24, color: '#999' }} />
            <p>Пустоватенько...</p>
        </div>
    );

    return (
        <>
            {contextHolder}
            <Table style={{
                width: '100%',
                height: '100vh'
            }}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <>
                                   <Row>
                                       <Col span={12}>
                                           <Text strong>
                                               Изображение
                                           </Text>
                                       </Col>
                                       <Col span={12}>
                                           <Text strong>
                                               Описание товара
                                           </Text>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col span={12}>
                                           <Image width={350}
                                                  src={`${process.env.REACT_APP_API_URL}/${record.goodImage}`}/>
                                       </Col>
                                       <Col span={12}>
                                           <Text italic>
                                               {record.goodDescription}
                                           </Text>
                                       </Col>
                                   </Row>
                               </>
                           )
                       }
                   }}
                   columns={columns}
                   dataSource={allGoods.map((good) => ({...good, key: good.id}))}
                   bordered
                   title={() => {
                       return (
                           <Space size="large">
                               <Button type={"primary"}
                                       onClick={() => {
                                           showModal(null)
                                       }}>Добавить товар</Button>
                               <Popconfirm
                                   title="Вы уверены, что хотите удалить все товары?"
                                   onConfirm={() => confirmAllGood()}
                                   okText="Да"
                                   cancelText="Отмена">
                                   <Button danger>Удалить все товары</Button>
                               </Popconfirm>
                           </Space>
                       )
                   }}
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   locale={{
                       emptyText: customEmptyText
                   }}
            />

            <AddAndEditGoodModal open={open}
                                 onOk={handleOk}
                                 onCancel={handleCancel}
                                 good={oneGood}/>
        </>
    );
};

export default SupplierGoodPage;
