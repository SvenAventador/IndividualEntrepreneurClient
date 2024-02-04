import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";

import {TailSpin} from "react-loader-spinner";
import {useUser} from "./store/UserStore";

const App = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    let {
        checkUser
    } = useUser()

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            setTimeout(() => {
                checkUser().finally(() => {
                    setIsLoading(false)
                })
            }, 2000)
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [checkUser])

    if (isLoading) {
        return <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%"
        }}>
            <TailSpin height="100"
                      width="80"
                      color="#0F3072"
                      ariaLabel="tail-spin-loading"
                      radius="3"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
            />
        </div>
    }

    return (
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    );
};

export default App;
