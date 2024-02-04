import {
    ADMIN_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    MANAGER_PATH,
    NOT_FOUND_PATH,
    REGISTRATION_PATH,
    SUPPLIER_PATH
} from "./utils/consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import NotFoundPage from "./pages/nothing/NotFoundPage";
import SupplierPage from "./pages/supplier/SupplierPage";
import AdminPage from "./pages/admin/AdminPage";
import ManagerPage from "./pages/manager/ManagerPage";

export const publicRoutes = [
    {
        path: MAIN_PATH,
        Component: Main
    },
    {
        path: NOT_FOUND_PATH,
        Component: NotFoundPage
    },
    {
        path: REGISTRATION_PATH,
        Component: Auth
    },
    {
        path: LOGIN_PATH,
        Component: Auth
    }
]

export const supplierRoute = [
    {
        path: SUPPLIER_PATH,
        Component: SupplierPage
    }
]

export const adminRoute = [
    {
        path: ADMIN_PATH,
        Component: AdminPage
    }
]

export const managerRoute = [
    {
        path: MANAGER_PATH,
        Component: ManagerPage
    }
]