import React from 'react';
import {
    Layout,
    Menu,
    Button,
    Switch
} from 'antd';
import {
    UnorderedListOutlined,
    AppleOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {useUser} from "../../store/UserStore";
import Swal from "sweetalert2";
import {LOGIN_PATH} from "../../utils/consts";
import ManagerGoodsPage from "../../components/manager/ManagerGoodsPage";
import ManagerInvoicesPage from "../../components/manager/ManagerInvoicesPage";

const {Sider} = Layout;

const ManagerPage = () => {
    const history = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const [theme, setTheme] = React.useState('light');
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('invoice');
    const {logoutUser} = useUser();

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Внимание",
                text: 'До скорых встреч, друг! Ждем тебя снова! ❤️',
                icon: "success"
            }).then(() => {
                history(LOGIN_PATH);
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
        getItem('Накладные', '1', <UnorderedListOutlined/>, () => setSelectedMenuItem('invoice')),
        getItem('Товары', '2', <AppleOutlined/>, () => setSelectedMenuItem('goods')),
        getItem('Выйти из аккаунта', '3', <LogoutOutlined/>, handleLogout)
    ];

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleThemeChange = (checked) => {
        setTheme(checked ? 'dark' : 'light');
    };

    return (
        <Layout style={{height: '100vh'}}>
            <Sider collapsible
                   width={300}
                   collapsed={collapsed}
                   theme={theme}>
                <div className={collapsed ? 'menu-header-collapsed' : ''}>
                    <Button
                        type="text"
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
                    <Switch checked={theme === 'dark'}
                            onChange={handleThemeChange}
                            checkedChildren={"Тёмная тема"}
                            unCheckedChildren={"Светлая тема"}
                            className="theme-switch"/>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme={theme}
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Layout.Content
                    style={{
                        background: theme === 'dark' ? '#000f1e' : '#f0f2f5'
                    }}>
                    {selectedMenuItem === 'invoice' && <ManagerInvoicesPage theme={theme}/>}
                    {selectedMenuItem === 'goods' && <ManagerGoodsPage theme={theme}/>}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default ManagerPage;