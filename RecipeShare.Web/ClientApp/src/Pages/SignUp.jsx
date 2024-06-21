import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

    const [firstName, setFIrstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onButtonClick = async () => {
        await axios.post('/api/users/signup', {
            User: {
                firstName,
                lastName,
                email
            },
            password
        });
        navigate('/login');
    }

    return (
        <div style={{marginTop: 80}}>
            <input type='text' value={firstName} name='firstname' placeholder='First Name' onChange={e => setFIrstName(e.target.value)} className='form-control' />
            <input type='text' value={lastName} name='lastname' placeholder='Last Name' onChange={e => setLastName(e.target.value)} className='form-control' />
            <input type='email' value={email} name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} className='form-control' />
            <input type='password' value={password} name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} className='form-control' />
            <button className='btn btn-primary' onClick={onButtonClick}>Sign up</button>
            <a href='/login'>Already have an account? Click here to log in</a>
        </div>
    )
};

export default SignUp;