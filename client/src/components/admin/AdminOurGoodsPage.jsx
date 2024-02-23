import React from 'react';
import {
    Button,
    Col,
    Image,
    Input, notification,
    Row,
    Space,
    Table,
    Typography
} from "antd";
import {useAdmin} from "../../store/AdminStore";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import OurGoodModal from "./modal/OurGoodModal";

const {Text} = Typography


const AdminOurGoodsPage = () => {
    let {
        getAllGoods
    } = useAdmin()

    const [goods, setGoods] = React.useState([]);
    React.useEffect(() => {
        getAllGoods().then(({allGoods}) => {
            setGoods(allGoods)
        })
    }, [getAllGoods])

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

    const customEmptyText = (
        <div>
            <SearchOutlined style={{fontSize: 24, color: '#999'}}/>
            <p>Пустоватенько...</p>
        </div>
    );

    const [open, setOpen] = React.useState(false)
    const handleOk = () => {
        getAllGoods().then(({allGoods}) => {
            setGoods(allGoods)
        })
        setOpen(false)
    }
    const handleCancel = () => {
        setOpen(false)
    }

    const [id, setId] = React.useState(0)
    const [amount, setAmount] = React.useState(0)
    const showModal = (id, amount) => {
        setId(id)
        setAmount(amount)
        setOpen(true)
    }

    const columns = [
        {
            title: '№ товара',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id
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
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            render: (record) => {
                return (
                    <Space size={"large"}>
                        <Button style={{
                            background: "green",
                            color: 'white'
                        }}
                        onClick={() => {
                            showModal(record.id, record.goodAmount)
                        }}>Изменить количество</Button>
                    </Space>
                )
            }
        }
    ]

    return (
        <>
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
                   dataSource={goods.map((good) => ({
                       ...good,
                       key: good.id,
                       actions: {
                           id: good.id,
                           goodAmount: good.goodAmount
                       }
                   }))}
                   bordered
                   pagination={{
                       defaultPageSize: 5,
                       showSizeChanger: false
                   }}
                   locale={{
                       emptyText: customEmptyText
                   }}
            />
            <OurGoodModal id={id}
                          amount={amount}
                          open={open}
                          onOk={handleOk}
                          onCancel={handleCancel} />
        </>
    );
};

export default AdminOurGoodsPage;
