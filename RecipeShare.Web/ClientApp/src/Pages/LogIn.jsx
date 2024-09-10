import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [valid, setValid] = useState(true);
    const { setUser } = useAuth();

    const onButtonClick = async () => {
        const { data } = await axios.post('/api/users/login', { email, password });
        const isValid = data;
        setValid(isValid);
        if (isValid) {
            setUser(data);
            navigate('/');
        }
    }

    return (
        <div style={{ backgroundColor: 'aquamarine' }}>
            <div className='container'>
                <div style={{ marginTop: 80 }}>
                    <div className='col-md-6 offset-3'>
                        <div className='card'>
                            <div className='card-header'>
                                <h1>Log In Here</h1>
                            </div>
                            <div className='card-body'>
                                {!valid && <h5 className='text-danger'>Invalid login. Please try again.</h5>}
                                <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='form-control mt-2' />
                                <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' className='form-control mt-2' />
                            </div>
                            <div className='card-footer'>
                                <button className='btn btn-success w-100' onClick={onButtonClick}>Log In</button>
                                <a href='/signup'>Don't have an account? Click here to sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LogIn;