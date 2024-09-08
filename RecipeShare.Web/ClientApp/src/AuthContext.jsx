import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import './Pages/Home.css';

const AuthContext = createContext();

const AuthComponent = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {
            const { data } = await axios.get('/api/users/getcurrentuser');
            setUser(data);
            setIsLoading(false);
        };

        loadUser();

    }, [])

    if (isLoading) {
        return (
            <div className="app-container" style={{backgroundColor: 'black'} }>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <span className='loader'></span>
            </div>
        </div>
        )
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthComponent, useAuth };