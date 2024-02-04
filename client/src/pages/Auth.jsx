import LoginForm from "../components/account/LoginForm";
import {useLocation} from "react-router-dom";
import {LOGIN_PATH} from "../utils/consts";
import RegistrationForm from "../components/account/RegistrationForm";

const Auth = () => {
    const location = useLocation().pathname
    return (
            location === LOGIN_PATH ? <LoginForm /> : <RegistrationForm />
    )
};

export default Auth;