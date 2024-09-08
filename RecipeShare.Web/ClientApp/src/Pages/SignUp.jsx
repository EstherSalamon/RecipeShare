import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

    const [firstName, setFIrstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [emailExists, setEmailExists] = useState(false);

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

    useEffect(() => {

        const loadData = async () => {
            const { data } = await axios.get(`/api/users/emailexists?email=${email}`);
            setEmailExists(data);
        }

        loadData();

    }, [email]);

    return (
        <div className='container' style={{ backgroundColor: 'aquamarine' }}>
            <div style={{marginTop: 80} }>
            <div className='col-md-6 offset-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h1>Sign Up Here</h1>
                    </div>
                    <div className='card-body'>
                        <input type='text' value={firstName} name='firstname' placeholder='First Name' onChange={e => setFIrstName(e.target.value)} className='form-control mt-2' />
                            <input type='text' value={lastName} name='lastname' placeholder='Last Name' onChange={e => setLastName(e.target.value)} className='form-control mt-2' />
                            {emailExists && <h6 className='text-danger'>Email Unavailable</h6> }
                        <input type='email' value={email} name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} className='form-control mt-2' />
                        <input type='password' value={password} name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} className='form-control mt-2' />
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-primary w-100' onClick={onButtonClick}>Sign up</button>
                        <a href='/login'>Already have an account? Click here to log in</a>
                    </div>
                </div>
            </div>       
            </div>
        </div>
    )
};

export default SignUp;