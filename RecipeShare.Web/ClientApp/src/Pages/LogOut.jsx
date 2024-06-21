import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const LogOut = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const logOut = async () => {
            await axios.get('/api/users/logout');
            setUser(null);
            navigate('/');
        };

        logOut();

    }, [])

    return (<></>);
};

export default LogOut;