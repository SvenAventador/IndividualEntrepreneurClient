import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {
    adminRoute,
    managerRoute,
    publicRoutes,
    supplierRoute
} from "../../routes";
import {NOT_FOUND_PATH} from "../../utils/consts";
import {useUser} from "../../store/UserStore";

const AppRoute = () => {
    let {
        user
    } = useUser()

    return (
        <Routes>
            {
                publicRoutes.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={<Component/>}
                    />
                ))
            }
            {
                adminRoute.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={user?.userRole === 'ADMIN' ? <Component/>
                                                               : <Navigate to="/"/>}
                    />
                ))
            }
            {
                managerRoute.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={user?.userRole === 'MANAGER' ? <Component/>
                                                                 : <Navigate to="/"/>}
                    />
                ))
            }
            {
                supplierRoute.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={user?.userRole === 'SUPPLIER' ? <Component/>
                                                                  : <Navigate to="/"/>}
                    />
                ))
            }
            <Route path="*" element={<Navigate replace to={NOT_FOUND_PATH}/>}/>
        </Routes>
    );
};

export default AppRoute;