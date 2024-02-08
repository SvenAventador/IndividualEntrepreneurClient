import React from 'react';
import {
    Layout,
    Menu,
    Button
} from 'antd';
import {
    UserOutlined,
    AppleOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {useUser} from "../../store/UserStore";
import Swal from "sweetalert2";
import {MAIN_PATH} from "../../utils/consts";
import AdminSupplierPage from "../../components/admin/AdminSupplierPage";
import AdminOurGoodsPage from "../../components/admin/AdminOurGoodsPage";

const {Sider} = Layout;

const AdminPage = () => {
    const history = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('suppliers');
    const {logoutUser} = useUser();

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Внимание",
                text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                icon: "success"
            }).then(() => {
                history(MAIN_PATH);
            });
        });
    };

    function getItem(label, key, icon, onClick) {
        return {
            label,
            key,
            icon,
            onClick
        };
    }

    const items = [
        getItem('Поставщики', '1', <UserOutlined/>, () => setSelectedMenuItem('suppliers')),
        getItem('Наши товары', '2', <AppleOutlined/>, () => setSelectedMenuItem('goods_company')),
        getItem('Выйти из аккаунта', '3', <LogoutOutlined/>, handleLogout)
    ];

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout style={{height: '100vh'}}>
            <Sider collapsible
                   style={{
                       background: 'white'
                   }}
                   width={300}
                   collapsed={collapsed}>
                <div className={collapsed ? 'menu-header-collapsed' : ''}>
                    <Button type="text"
                            onClick={toggleCollapsed}
                            className="collapse-button"
                            style={{
                                backgroundColor: '#fff',
                                width: '80px',
                                marginRight: '1rem',
                                marginBottom: '.5rem'
                            }}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                </div>
                <Menu defaultSelectedKeys={['1']}
                      mode="inline"
                      items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Layout.Content>
                    {selectedMenuItem === 'suppliers' && <AdminSupplierPage/>}
                    {selectedMenuItem === 'goods_company' && <AdminOurGoodsPage/>}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;